// Room-layout data for the Shared Kitchen & Bath 3D diagram (see
// components/WashFacilityModel.astro and lib/buildingModel.ts).
//
// Single-storey, back-to-back layout: 4 kitchens in a row facing the front
// of the building, 5 bathrooms in a row directly behind them sharing the
// central spine wall. Kitchens have an open doorway (no door) facing the
// front; bathroom doors are on the rear exterior wall, so they never face
// the kitchen side. Mixed-gender bathrooms, no separate wings.
//
// Kitchens are deliberately both wider AND deeper than the bathrooms —
// each needs room for a food-prep counter plus a separate stove area,
// not just a stove nook, so the kitchen band is depth 3 vs the bathroom
// band's depth 2.

import type { FloorSpec } from '../lib/buildingModel';

export const floors: FloorSpec[] = [
	{
		label: 'Kitchen & bath block',
		zOffset: 0,
		bands: [
			{
				depth: 3,
				rooms: [
					{ type: 'kitchen', label: 'Kitchen 1', opening: { side: 'front', kind: 'gap' } },
					{ type: 'kitchen', label: 'Kitchen 2', opening: { side: 'front', kind: 'gap' } },
					{ type: 'kitchen', label: 'Kitchen 3', opening: { side: 'front', kind: 'gap' } },
					{ type: 'kitchen', label: 'Kitchen 4', opening: { side: 'front', kind: 'gap' } },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bathroom', label: 'Bathroom 1', opening: { side: 'back', kind: 'door' } },
					{ type: 'bathroom', label: 'Bathroom 2', opening: { side: 'back', kind: 'door' } },
					{ type: 'bathroom', label: 'Bathroom 3', opening: { side: 'back', kind: 'door' } },
					{ type: 'bathroom', label: 'Bathroom 4', opening: { side: 'back', kind: 'door' } },
					{ type: 'bathroom', label: 'Bathroom 5', opening: { side: 'back', kind: 'door' } },
				],
			},
		],
	},
];

export const ROOM_COLORS: Record<string, string> = {
	kitchen: '#0C7F79',
	bathroom: '#3E6270',
};

export const ROOM_LEGEND: { type: string; label: string }[] = [
	{ type: 'kitchen', label: 'Kitchen — 4 total, open doorway (no door), facing the front. Deeper than the bathrooms — room for a prep counter and a stove.' },
	{ type: 'bathroom', label: 'Shared bathroom — 5 total, mixed-gender, doors face the rear, opposite the kitchens' },
];
