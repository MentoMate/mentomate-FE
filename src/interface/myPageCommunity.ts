export interface IMyCommunityItem {
	readonly category: string;
	readonly commentCount: number;
	readonly content: string;
	readonly id: number;
	readonly postLikesCount: number;
	readonly title: string;
	readonly uploadFolder: string;
	readonly uploadUrl: string;
	readonly writer: string;
}
export interface IMyCommunityItemProps {
	data: IMyCommunityItem[];
}
