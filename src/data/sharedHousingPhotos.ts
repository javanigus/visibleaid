// Example photos for shared-housing facility pages. These are illustrative
// stand-ins (no real facilities exist yet) reused across every housing-type
// facility page until real photos are available — see
// src/pages/facilities/[slug].astro.

import type { ImageMetadata } from 'astro';
import front from '../assets/shared-housing-front.png';
import restaurant from '../assets/shared-housing-restaurant.png';
import bedroom from '../assets/shared-housing-bedroom.png';
import bathroom from '../assets/shared-housing-bathroom.png';

export interface ExamplePhoto {
	src: ImageMetadata;
	alt: string;
}

const sharedHousingPhotos: ExamplePhoto[] = [
	{ src: front, alt: 'Example photo — front of a shared housing facility' },
	{ src: restaurant, alt: 'Example photo — the ground-floor restaurant at a shared housing facility' },
	{ src: bedroom, alt: 'Example photo — a resident bedroom at a shared housing facility' },
	{ src: bathroom, alt: 'Example photo — a shared bathroom at a shared housing facility' },
];

export default sharedHousingPhotos;
