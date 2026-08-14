// Construction-progress photos for shared-housing facility pages. Same
// illustrative-stand-in approach as sharedHousingPhotos.ts — reused across
// every housing-type facility page until real photos exist. Order matches
// Facility.progressSteps ('Groundbreaking', 'Walls up', 'Roofed', 'Move-in').

import type { ImageMetadata } from 'astro';
import groundbreaking from '../assets/shared-housing-groundbreaking.png';
import wallsUp from '../assets/shared-housing-walls-up.jpg';
import roofed from '../assets/shared-housing-roofed.jpg';
import moveIn from '../assets/shared-housing-move-in.jpg';

export interface ExamplePhoto {
	src: ImageMetadata;
	alt: string;
}

const sharedHousingConstructionPhotos: ExamplePhoto[] = [
	{ src: groundbreaking, alt: 'Example photo — groundbreaking at a shared housing facility site' },
	{ src: wallsUp, alt: 'Example photo — walls going up at a shared housing facility' },
	{ src: roofed, alt: 'Example photo — a shared housing facility once roofed' },
	{ src: moveIn, alt: 'Example photo — move-in day at a completed shared housing facility' },
];

export default sharedHousingConstructionPhotos;
