// Data model for the interactive 3D "dollhouse" diagram on /types.
// This is a schematic massing model, not an architectural drawing — the
// goal is to make the room count/layout legible at a glance, not to be
// dimensionally accurate. Edit the bands below to change the room mix;
// the 3D layout, camera framing, and legend are all derived from this data.

export type RoomType = 'restaurant' | 'kitchen' | 'bedroom' | 'bathroom' | 'void';

export interface RoomSpec {
	type: RoomType;
	label: string;
	/** Width in grid units. Omit to split the band's remaining width evenly among siblings that also omit it. */
	width?: number;
}

/** A left-to-right strip of rooms, `depth` grid units front-to-back. */
export interface Band {
	depth: number;
	rooms: RoomSpec[];
}

export interface FloorSpec {
	label: string;
	bands: Band[];
	/** Front-to-back offset (grid units) from the ground floor's front edge — lets an upper floor sit above only part of the footprint below it. */
	zOffset: number;
}

export const GRID_WIDTH = 10;
export const ROOM_HEIGHT = 1.4;
/** Vertical gap between floors in the exploded view. */
export const FLOOR_GAP = 1.3;

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
					{ type: 'bedroom', label: 'Ground-floor bedroom 5' },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bedroom', label: 'Ground-floor bedroom 6' },
					{ type: 'bedroom', label: 'Ground-floor bedroom 7' },
					{ type: 'bathroom', label: 'Ground-floor bathroom 1' },
					{ type: 'bathroom', label: 'Ground-floor bathroom 2' },
					{ type: 'bathroom', label: 'Ground-floor bathroom 3' },
				],
			},
		],
	},
	{
		label: 'Upper floor',
		// Sits above the ground floor's bedroom wing only — the restaurant
		// and kitchen are single-storey, open to the sky above them.
		zOffset: 3.2,
		bands: [
			{
				depth: 2,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 1' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 2' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 3' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 4' },
					{ type: 'bedroom', label: 'Upper-floor bedroom 5' },
				],
			},
			{
				depth: 2,
				rooms: [
					{ type: 'bedroom', label: 'Upper-floor bedroom 6', width: 2.5 },
					{ type: 'bedroom', label: 'Upper-floor bedroom 7', width: 2.5 },
					{ type: 'bathroom', label: 'Upper-floor bathroom 1', width: 2.5 },
					{ type: 'bathroom', label: 'Upper-floor bathroom 2', width: 2.5 },
				],
			},
		],
	},
];

export const ROOM_COLORS: Record<Exclude<RoomType, 'void'>, string> = {
	restaurant: '#12A39C',
	kitchen: '#0C7F79',
	bedroom: '#C7DEDC',
	bathroom: '#3E6270',
};

export const ROOM_LEGEND: { type: Exclude<RoomType, 'void'>; label: string }[] = [
	{ type: 'restaurant', label: 'Restaurant, open to the street' },
	{ type: 'kitchen', label: 'Kitchen' },
	{ type: 'bedroom', label: 'Bedroom — 7 ground floor, 7 upstairs (14 total, one per resident)' },
	{ type: 'bathroom', label: 'Shared bathroom — 3 ground floor, 2 upstairs (5 total)' },
];
