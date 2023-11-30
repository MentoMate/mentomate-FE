export interface IMentoringCard {
	readonly uploadUrl: string;
	readonly title: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly amount: string;
	readonly numberOfPeople: string;
	readonly category: string;
	readonly name: string;
	readonly rating: string | null;
	readonly mentoringId: number;
}
