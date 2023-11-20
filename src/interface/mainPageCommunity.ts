export interface ICommunityItem {
	readonly category: string;
	readonly commentCount: number;
	readonly content: string;
	readonly postId: number;
	readonly postLikesCount: number;
	readonly title: string;
	readonly writer: string;
	readonly uploadUrl: string;
}
