// Example photos for shared kitchen & bath facility pages. Same
// illustrative-stand-in approach as sharedHousingPhotos.ts — reused across
// every wash-type facility page until real photos exist.

import type { ImageMetadata } from 'astro';
import kitchens from '../assets/kitchens.jpg';
import bathrooms from '../assets/bathrooms.jpg';
import kitchenInterior from '../assets/kitchen-straight.jpg';
import bathroomInterior from '../assets/bathroom-straight.jpg';

export interface ExamplePhoto {
	src: ImageMetadata;
	alt: string;
}

const sharedWashPhotos: ExamplePhoto[] = [
	{ src: kitchens, alt: 'Example photo — the kitchen side of a shared kitchen & bath facility' },
	{ src: bathrooms, alt: 'Example photo — the bathroom side of a shared kitchen & bath facility' },
	{ src: kitchenInterior, alt: 'Example photo — inside one of the kitchen stalls at a shared kitchen & bath facility' },
	{ src: bathroomInterior, alt: 'Example photo — inside one of the bathroom stalls at a shared kitchen & bath facility' },
];

export default sharedWashPhotos;
