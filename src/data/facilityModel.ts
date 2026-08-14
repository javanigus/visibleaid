// Room-layout data for the Shared Housing 3D diagram (see
// components/FacilityModel.astro and lib/buildingModel.ts).
// This is a schematic massing model, not an architectural drawing — the
// goal is to make the room count/layout legible at a glance, not to be
// dimensionally accurate. Edit the bands below to change the room mix.
//
// Deliberately a simple rectangle, same footprint on both floors — land
// costs money, and this is a facility for people with nowhere else to go,
// so functionality wins over architectural flourish. No separate living
// room: residents can gather in the restaurant instead.
//
// Ground floor: restaurant (open to the street), kitchen, some bedrooms,
// and bathrooms shared by both restaurant customers and residents.
// Upper floor: the rest of the bedrooms, plus bathrooms for residents only.

import type { FloorSpec } from '../lib/buildingModel';

export const floors: FloorSpec[] = [
	{
		label: 'Ground floor',
		zOffset: 0,
		bands: [
			{ depth: 2, rooms: [{ type: 'restaurant', label: 'Restaurant, open to the street' }] },
			{
				depth: 1.2,
				rooms: [
					{ type: 'void', label: '', width: 3 },
					{ type: 'kitchen', label: 'Kitchen', width: 4 },
					{ type: 'void', label: '', width: 3 },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bedroom', label: 'Ground-floor bedroom 1' },
					{ type: 'bedroom', label: 'Ground-floor bedroom 2' },
					{ type: 'bedroom', label: 'Ground-floor bedroom 3' },
					{ type: 'bedroom', label: 'Ground-floor bedroom 4' },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bathroom', label: 'Ground-floor bathroom 1 (shared with restaurant customers)' },
					{ type: 'bathroom', label: 'Ground-floor bathroom 2 (shared with restaurant customers)' },
					{ type: 'bathroom', label: 'Ground-floor bathroom 3 (shared with restaurant customers)' },
				],
			},
		],
	},
	{
		label: 'Upper floor',
		// Same footprint as the ground floor (simple rectangle) — no
		// restaurant/kitchen up here, so the whole depth is bedrooms + baths.
		zOffset: 0,
		bands: [
			{
				depth: 2.4,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 1' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 2' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 3' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 4' },
				],
			},
			{
				depth: 2.4,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 5' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 6' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 7' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 8' },
				],
			},
			{
				depth: 2.4,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 9' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 10' },
					{ type: 'bathroom', label: 'Upper-floor bathroom 1' },
					{ type: 'bathroom', label: 'Upper-floor bathroom 2' },
				],
			},
		],
	},
];

export const ROOM_COLORS: Record<string, string> = {
	restaurant: '#12A39C',
	kitchen: '#0C7F79',
	bedroom: '#C7DEDC',
	bathroom: '#3E6270',
};

export const ROOM_LEGEND: { type: string; label: string }[] = [
	{ type: 'restaurant', label: 'Restaurant, open to the street' },
	{ type: 'kitchen', label: 'Kitchen' },
	{ type: 'bedroom', label: 'Bedroom — 4 ground floor, 10 upstairs (14 total, one per resident)' },
	{ type: 'bathroom', label: 'Shared bathroom — 3 ground floor (also used by restaurant customers), 2 upstairs (5 total)' },
];
