export interface IMentorItem {
	readonly mentorId: number;
	readonly name: string | null;
	readonly uploadUrl: string;
	readonly introduce: string;
	readonly rating: string | null;
	readonly mainCategory: string | null;
	readonly middleCategory: string | null;
}
