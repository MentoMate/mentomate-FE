export interface IMentorItem {
	readonly id: number;
	readonly career: number;
	readonly imgUrl: string;
	readonly introduce: string;
	readonly mainCategory: string;
	readonly middleCategory: string;
	readonly name: string;
}

export interface IMentorItemProps {
	readonly mentorItem: IMentorItem;
}
