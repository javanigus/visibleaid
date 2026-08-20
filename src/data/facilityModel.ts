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
// Two rows per floor: a front row (unchanged per floor — restaurant/kitchen
// on the ground floor, an all-bedroom row upstairs) and a back row, which
// on both floors is bathroom / bedroom / bedroom / bedroom / bathroom,
// left to right. Bathrooms are sized ~1/3 of a bedroom (US convention),
// so with 3 bedrooms + 2 bathrooms filling the 10-unit width: bedroom
// width = 30/11 ≈ 2.727, bathroom width = 10/11 ≈ 0.909.
//
// Ground floor: restaurant (open to the street), kitchen, bathrooms shared
// by both restaurant customers and residents, and some bedrooms.
// Upper floor: the rest of the bedrooms, plus bathrooms for residents only.

import type { FloorSpec } from '../lib/buildingModel';

const BEDROOM_W = 30 / 11;
const BATHROOM_W = 10 / 11;

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
					{ type: 'bathroom', label: 'Ground-floor bathroom 1 (shared with restaurant customers)', width: BATHROOM_W },
					{ type: 'bedroom', label: 'Ground-floor bedroom 1', width: BEDROOM_W },
					{ type: 'bedroom', label: 'Ground-floor bedroom 2', width: BEDROOM_W },
					{ type: 'bedroom', label: 'Ground-floor bedroom 3', width: BEDROOM_W },
					{ type: 'bathroom', label: 'Ground-floor bathroom 2 (shared with restaurant customers)', width: BATHROOM_W },
				],
			},
		],
	},
	{
		label: 'Upper floor',
		// Same footprint as the ground floor (simple rectangle) — no
		// restaurant/kitchen up here, so the whole depth is bedrooms + baths.
		// Front-row depth (3.2) matches the ground floor's restaurant+kitchen
		// depth, so both floors total the same 5.2 units front-to-back.
		zOffset: 0,
		bands: [
			{
				depth: 3.2,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 1' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 2' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 3' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 4' },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bathroom', label: 'Upper-floor bathroom 1', width: BATHROOM_W },
					{ type: 'bedroom', label: 'Upper-floor bedroom 5', width: BEDROOM_W },
					{ type: 'bedroom', label: 'Upper-floor bedroom 6', width: BEDROOM_W },
					{ type: 'bedroom', label: 'Upper-floor bedroom 7', width: BEDROOM_W },
					{ type: 'bathroom', label: 'Upper-floor bathroom 2', width: BATHROOM_W },
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
	{ type: 'bedroom', label: 'Bedroom — 3 ground floor, 7 upstairs (10 total, one per resident)' },
	{ type: 'bathroom', label: 'Shared bathroom — 2 ground floor (also used by restaurant customers), 2 upstairs (4 total), each ~1/3 the size of a bedroom' },
];
