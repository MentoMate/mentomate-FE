export interface IMentoringItem {
	readonly id: number;
	readonly writer: string;
	readonly title: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly amount: number;
	readonly numberOfPeople: number;
	readonly category: string;
	readonly rating: number;
	readonly uploadUrl: string;
	readonly countWatch: number;
}
