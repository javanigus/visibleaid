// Construction-progress photos for shared kitchen & bath facility pages.
// Same illustrative-stand-in approach as sharedHousingConstructionPhotos.ts —
// reused across every wash-type facility page until real photos exist.
// Order matches Facility.progressSteps ('Groundbreaking', 'Walls up',
// 'Roofed', 'Move-in'). The move-in photo reuses the completed-building
// exterior shot rather than a separate generated image.

import type { ImageMetadata } from 'astro';
import groundbreaking from '../assets/construction-kitchen-bath-1.jpg';
import wallsUp from '../assets/construction-kitchen-bath-2.jpg';
import roofed from '../assets/construction-kitchen-bath-3.jpg';
import moveIn from '../assets/construction-kitchen-bath-4.jpg';

export interface ExamplePhoto {
	src: ImageMetadata;
	alt: string;
}

const sharedWashConstructionPhotos: ExamplePhoto[] = [
	{ src: groundbreaking, alt: 'Example photo — groundbreaking at a shared kitchen & bath facility site' },
	{ src: wallsUp, alt: 'Example photo — walls going up at a shared kitchen & bath facility' },
	{ src: roofed, alt: 'Example photo — a shared kitchen & bath facility once roofed' },
	{ src: moveIn, alt: 'Example photo — the completed, opened shared kitchen & bath facility' },
];

export default sharedWashConstructionPhotos;
