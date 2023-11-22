export interface IEndMentoringItem {
	readonly amount: number;
	readonly category: string;
	readonly content: string;
	readonly grade: number;
	readonly name: string;
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
	readonly mentoringId: number;
}

export interface IEndMentoringItemProps {
	readonly data: IEndMentoringItem[];
}
