export interface IMentoringDetailProps {
	readonly data: IMentoringInfo;
}

export interface IMentoringEditProps {
	readonly data: IMentoringInfo;
}

export interface IMentoringInfo {
	readonly amount: number;
	readonly category: string;
	readonly content: string;
	readonly countWatch: number;
	readonly startDate: string;
	readonly endDate: string;
	readonly followers: number;
	readonly leftPeople: number;
	readonly mentoringId: number;
	readonly title: string;
	readonly numberOfPeople: number;
	readonly status: string;
	readonly userId: number;
	readonly nickName: string;
	readonly registerDate: Date;
	readonly updateDate: Date;
	readonly name: string;
	readonly owner: boolean;
	readonly useProfileImg: string;
}
