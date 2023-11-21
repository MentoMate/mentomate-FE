export interface IMentorItem {
	readonly id: number;
	readonly career: number;
	readonly uploadUrl: string;
	readonly introduce: string;
	readonly mainCategory: string;
	readonly middleCategory: string;
	readonly name: string;
	readonly rating: number;
	readonly followers: number;
}

export interface IMentorItemProps {
	readonly mentorItem: IMentorItem;
}
