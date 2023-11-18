export interface IEndMentoringItem {
	readonly amount: number;
	readonly category: number;
	readonly content: string;
	readonly countWatch: string;
	readonly deleteDate: string;
	readonly endDate: string;
	readonly id: string;
	readonly numberOfPeople: number;
	readonly registerDate: number;
	readonly startDate: number;
	readonly status: number;
	readonly title: number;
	readonly updateDate: number;
	readonly uploadFolder: number;
	readonly uploadUrl: string;
	readonly userId: number;
}

export interface IEndMentoringItemProps {
	readonly data: IEndMentoringItem[];
}
