export interface IMyMentoringItem {
	readonly amount: number;
	readonly category: string;
	readonly endDate: string;
	readonly grade: number;
	readonly mentoringId: number;
	readonly name: string;
	readonly numberOfPeople: number;
	readonly startDate: string;
	readonly title: string;
	readonly uploadUrl: string;
	readonly userId: number;
}

export interface IMyMentoringItemProps {
	readonly data: IMyMentoringItem[];
}
