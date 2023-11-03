export interface IMentoringDetailProps {
	data: IMentoringInfo;
}

export interface IMentoringEditProps {
	data: IMentoringInfo;
}

interface IMentoringInfo {
	readonly mentoringId: number;
	readonly title: string;
	readonly content: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly status: string;
	readonly category: string;
	readonly userId: number;
	readonly nickName: string;
	readonly countWatch: number;
	readonly registerDate: Date;
	readonly updateDate: Date;
}
