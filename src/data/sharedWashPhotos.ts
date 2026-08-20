// Example photos for shared kitchen & bath facility pages. Same
// illustrative-stand-in approach as sharedHousingPhotos.ts — reused across
// every wash-type facility page until real photos exist. Not all 4 slots
// are filled yet; [slug].astro shows a placeholder for any missing ones.

import type { ImageMetadata } from 'astro';
import kitchens from '../assets/kitchens.jpg';
import bathrooms from '../assets/bathrooms.jpg';

export interface ExamplePhoto {
	src: ImageMetadata;
	alt: string;
}

const sharedWashPhotos: ExamplePhoto[] = [
	{ src: kitchens, alt: 'Example photo — the kitchen side of a shared kitchen & bath facility' },
	{ src: bathrooms, alt: 'Example photo — the bathroom side of a shared kitchen & bath facility' },
];

export default sharedWashPhotos;
