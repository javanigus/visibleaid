export type FacilityType = 'housing' | 'wash';

export interface Facility {
	slug: string;
	location: string;
	type: FacilityType;
	typeLabel: string;
	residentsLabel: string;
	opened: number;
	partner: string;
	stats: { n: string; l: string }[];
	progressSteps: string[];
	donorWall: string[];
}

const facilities: Facility[] = [
	{
		slug: 'rangpur-bangladesh',
		location: 'Rangpur district, Bangladesh',
		type: 'housing',
		typeLabel: 'Housing',
		residentsLabel: '20',
		opened: 2024,
		partner: 'local elder-care NGO',
		stats: [
			{ n: '620', l: 'Meals served, last 30 days' },
			{ n: '410', l: 'Bathing facility uses, last 30 days' },
			{ n: '$140', l: 'Food stall revenue, last 30 days' },
		],
		progressSteps: ['Groundbreaking', 'Walls up', 'Roofed', 'Move-in'],
		donorWall: ['Anonymous', 'J. Martinez', 'Anonymous', 'The Aziz Family', 'Anonymous'],
	},
	{
		slug: 'comilla-bangladesh',
		location: 'Comilla district, Bangladesh',
		type: 'housing',
		typeLabel: 'Housing',
		residentsLabel: '18',
		opened: 2025,
		partner: 'local elder-care NGO',
		stats: [
			{ n: '540', l: 'Meals served, last 30 days' },
			{ n: '365', l: 'Bathing facility uses, last 30 days' },
			{ n: '$95', l: 'Food stall revenue, last 30 days' },
		],
		progressSteps: ['Groundbreaking', 'Walls up', 'Roofed', 'Move-in'],
		donorWall: ['Anonymous', 'Anonymous', 'The Chowdhury Family', 'Anonymous'],
	},
	{
		slug: 'bantul-indonesia',
		location: 'Bantul, Yogyakarta, Indonesia',
		type: 'housing',
		typeLabel: 'Housing',
		residentsLabel: '20',
		opened: 2026,
		partner: 'local elder-care NGO',
		stats: [
			{ n: '180', l: 'Meals served, last 30 days' },
			{ n: '120', l: 'Bathing facility uses, last 30 days' },
			{ n: '$20', l: 'Food stall revenue, last 30 days' },
		],
		progressSteps: ['Groundbreaking', 'Walls up', 'Roofed', 'Move-in'],
		donorWall: ['Anonymous', 'S. Widodo', 'Anonymous'],
	},
	{
		slug: 'khulna-bangladesh',
		location: 'Khulna district, Bangladesh',
		type: 'wash',
		typeLabel: 'Kitchen & bath',
		residentsLabel: '34 households',
		opened: 2025,
		partner: 'community maintenance committee',
		stats: [
			{ n: '2,150', l: 'Bathing facility uses, last 30 days' },
			{ n: '1,480', l: 'Cooking sessions, last 30 days' },
			{ n: '$610', l: 'Community $ contributed, last 30 days' },
		],
		progressSteps: ['Groundbreaking', 'Trenching', 'Fixtures installed', 'Opened'],
		donorWall: ['Anonymous', 'Anonymous', 'The Rahman Family', 'Anonymous', 'Anonymous'],
	},
	{
		slug: 'sylhet-bangladesh',
		location: 'Sylhet district, Bangladesh',
		type: 'wash',
		typeLabel: 'Kitchen & bath',
		residentsLabel: '28 households',
		opened: 2026,
		partner: 'community maintenance committee',
		stats: [
			{ n: '890', l: 'Bathing facility uses, last 30 days' },
			{ n: '610', l: 'Cooking sessions, last 30 days' },
			{ n: '$240', l: 'Community $ contributed, last 30 days' },
		],
		progressSteps: ['Groundbreaking', 'Trenching', 'Fixtures installed', 'Opened'],
		donorWall: ['Anonymous', 'Anonymous', 'Anonymous'],
	},
];

export default facilities;

export function getFacilityBySlug(slug: string): Facility | undefined {
	return facilities.find((f) => f.slug === slug);
}
