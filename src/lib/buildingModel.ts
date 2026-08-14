// Shared engine behind the interactive 3D facility diagrams (see
// components/FacilityModel.astro and components/WashFacilityModel.astro).
// Each facility type supplies its own room-layout data (src/data/*Model.ts);
// this module turns that data into Three.js geometry and drives the
// renderer/camera/controls/render-loop, so adding a new facility type's
// diagram is a data file + a thin component, not a geometry rewrite.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type RoomType = string;

export interface Opening {
	/** Which face of the room this sits on: front = band-min-Z, back = band-max-Z. */
	side: 'front' | 'back';
	/** 'door' renders a raised, lit panel — reads as a door leaf you could close. 'gap' renders a flush, dark recess — reads as an open doorway with no door. */
	kind: 'door' | 'gap';
}

export interface RoomSpec {
	type: RoomType;
	label: string;
	/** Width in grid units. Omit to split the band's remaining width evenly among siblings that also omit it. */
	width?: number;
	opening?: Opening;
}

/** A left-to-right strip of rooms, `depth` grid units front-to-back. */
export interface Band {
	depth: number;
	rooms: RoomSpec[];
}

export interface FloorSpec {
	label: string;
	bands: Band[];
	/** Front-to-back offset (grid units) from the building's front edge — lets an upper floor sit above only part of the footprint below it. */
	zOffset: number;
}

export const GRID_WIDTH = 10;
export const ROOM_HEIGHT = 1.4;
/** Vertical gap between floors when a building has more than one (exploded view). */
export const FLOOR_GAP = 1.3;

/** Builds room boxes + floor slabs + door markers from floor data. Local coordinates: x 0..GRID_WIDTH, z 0..(building depth). */
export function buildFloorsGroup(floors: FloorSpec[], colors: Record<string, string>): THREE.Group {
	const group = new THREE.Group();
	const inkEdge = new THREE.LineBasicMaterial({ color: 0x10242b, transparent: true, opacity: 0.35 });
	// Door: a raised, lit panel — reads as a solid leaf mounted on the wall.
	const doorMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f8f8, roughness: 0.6 });
	// Gap: a flush, unlit dark recess — reads as an open doorway, not an object.
	const gapMaterial = new THREE.MeshBasicMaterial({ color: 0x0b1a1f });

	floors.forEach((floor, floorIndex) => {
		const y = floorIndex * (ROOM_HEIGHT + FLOOR_GAP);
		let zCursor = floor.zOffset;

		const floorDepth = floor.bands.reduce((sum, band) => sum + band.depth, 0);
		const slabGeo = new THREE.BoxGeometry(GRID_WIDTH, 0.15, floorDepth);
		const slab = new THREE.Mesh(slabGeo, new THREE.MeshStandardMaterial({ color: 0xf4f8f8, roughness: 0.9 }));
		slab.position.set(GRID_WIDTH / 2, y - 0.075, floor.zOffset + floorDepth / 2);
		group.add(slab);

		floor.bands.forEach((band) => {
			let xCursor = 0;
			const explicitWidth = band.rooms.reduce((sum, r) => sum + (r.width ?? 0), 0);
			const autoCount = band.rooms.filter((r) => r.width === undefined).length;
			const autoWidth = autoCount > 0 ? (GRID_WIDTH - explicitWidth) / autoCount : 0;

			band.rooms.forEach((room) => {
				const w = room.width ?? autoWidth;
				if (room.type !== 'void') {
					const boxW = Math.max(w - 0.12, 0.1);
					const boxD = Math.max(band.depth - 0.12, 0.1);
					const geo = new THREE.BoxGeometry(boxW, ROOM_HEIGHT, boxD);
					const color = colors[room.type] ?? '#9fb3b6';
					const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.85 }));
					mesh.position.set(xCursor + w / 2, y + ROOM_HEIGHT / 2, zCursor + band.depth / 2);
					mesh.userData.label = room.label;
					const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), inkEdge);
					mesh.add(edges);

					if (room.opening) {
						const { side, kind } = room.opening;
						const sign = side === 'front' ? -1 : 1;
						if (kind === 'door') {
							// proud of the wall, thicker, lit pale panel
							const doorW = Math.min(boxW * 0.4, 0.7);
							const doorH = ROOM_HEIGHT * 0.62;
							const doorGeo = new THREE.BoxGeometry(doorW, doorH, 0.06);
							const door = new THREE.Mesh(doorGeo, doorMaterial);
							door.position.set(0, -ROOM_HEIGHT / 2 + doorH / 2, sign * (boxD / 2 + 0.02));
							mesh.add(door);
						} else {
							// flush with the wall, thin, dark unlit recess — a wider gap than a door
							const gapW = Math.min(boxW * 0.55, 1);
							const gapH = ROOM_HEIGHT * 0.7;
							const gapGeo = new THREE.BoxGeometry(gapW, gapH, 0.02);
							const gap = new THREE.Mesh(gapGeo, gapMaterial);
							gap.position.set(0, -ROOM_HEIGHT / 2 + gapH / 2, sign * (boxD / 2 + 0.005));
							mesh.add(gap);
						}
					}

					group.add(mesh);
				}
				xCursor += w;
			});
			zCursor += band.depth;
		});
	});

	return group;
}

export interface FitInfo {
	center: THREE.Vector3;
	size: THREE.Vector3;
}

export interface MountOptions {
	canvas: HTMLCanvasElement;
	wrap: HTMLElement;
	/** Room geometry from buildFloorsGroup(), not yet added to a scene. */
	group: THREE.Group;
	/** Add ground/street/context meshes here — called after the group is centered and the camera fit is computed from the building alone, so these don't throw off the framing. */
	addExtras?: (group: THREE.Group, fit: FitInfo) => void;
	/** Camera viewing direction (from the fit center), before normalizing. Defaults to a pleasant three-quarter angle. */
	cameraDir?: THREE.Vector3;
}

/** Sets up the renderer/camera/lighting/controls/render-loop for a pre-built room group. Returns false (and does nothing further) if a WebGL context couldn't be created — the caller should show a fallback message in that case. */
export function mountInteractiveModel(opts: MountOptions): boolean {
	const { canvas, wrap, group, addExtras, cameraDir } = opts;

	// Attempt the real renderer up front, in its final config — a canvas can
	// only ever have one WebGL context attached to it, so a separate
	// feature-detection probe with a different config would make this fail.
	let renderer: THREE.WebGLRenderer;
	try {
		renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
	} catch {
		return false;
	}
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const scene = new THREE.Scene();
	scene.add(group);

	// center the building (only) at the origin
	const bounds = new THREE.Box3().setFromObject(group);
	const center = bounds.getCenter(new THREE.Vector3());
	group.position.x -= center.x;
	group.position.z -= center.z;

	// camera fit is computed from the building alone too, so ground/context
	// meshes added below don't throw off the framing
	const size = bounds.getSize(new THREE.Vector3());
	const fitCenter = new THREE.Vector3(0, center.y, 0);
	const maxDim = Math.max(size.x, size.y, size.z);

	addExtras?.(group, { center: fitCenter, size });

	// ---------- lighting ----------
	scene.add(new THREE.HemisphereLight(0xffffff, 0x223035, 1.2));
	const sun = new THREE.DirectionalLight(0xffffff, 0.9);
	sun.position.set(6, 10, 6);
	scene.add(sun);

	// ---------- camera, auto-framed to the model ----------
	const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
	const fitDist = (maxDim / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2))) * 1.55;
	const dir = (cameraDir ?? new THREE.Vector3(0.7, 0.62, 0.95)).clone().normalize();
	camera.position.copy(fitCenter).addScaledVector(dir, fitDist);
	camera.lookAt(fitCenter);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.target.copy(fitCenter);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.enablePan = false;
	controls.minDistance = fitDist * 0.5;
	controls.maxDistance = fitDist * 1.8;
	controls.minPolarAngle = 0.2;
	controls.maxPolarAngle = 1.45;
	controls.autoRotate = !prefersReducedMotion;
	controls.autoRotateSpeed = 0.7;
	controls.update();

	let resumeTimer: ReturnType<typeof setTimeout> | undefined;
	controls.addEventListener('start', () => {
		controls.autoRotate = false;
		if (resumeTimer) clearTimeout(resumeTimer);
	});
	controls.addEventListener('end', () => {
		if (prefersReducedMotion) return;
		resumeTimer = setTimeout(() => {
			controls.autoRotate = true;
		}, 4000);
	});

	function resize() {
		const w = wrap.clientWidth;
		const h = wrap.clientHeight;
		if (w === 0 || h === 0) return;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	}
	resize();
	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(wrap);

	// only render while the canvas is on screen
	let rafId: number | null = null;
	function renderFrame() {
		controls.update();
		renderer.render(scene, camera);
		rafId = requestAnimationFrame(renderFrame);
	}
	function start() {
		if (rafId === null) rafId = requestAnimationFrame(renderFrame);
	}
	function stop() {
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) start();
				else stop();
			}
		},
		{ threshold: 0.01 }
	);
	io.observe(canvas);

	return true;
}
