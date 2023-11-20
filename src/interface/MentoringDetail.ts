export interface IPastMentoring {
	readonly mentoringId: number;
	readonly title: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly category: string;
	readonly userId: number;
	readonly name: string;
	readonly uploadUrl: string;
	readonly grade: number;
}

export interface IReview {
	readonly mentoringId: number;
	readonly userId: number;
	readonly comment: string;
	readonly rating: number;
	readonly updateDate: string;
}

const asd = "asd";
