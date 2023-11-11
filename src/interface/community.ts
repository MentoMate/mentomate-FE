export interface ICommunityList {
	readonly id: number;
	readonly commentCount: number;
	readonly countWatch: number;
	readonly category: string;
	readonly title: string;
	readonly content: string;
	readonly writer: string;
	readonly postLikesCount: number;
	readonly registerDatetime: string;
	readonly updateDatetime: string;
	readonly uploadFolder: string;
	readonly uploadUrl: string;
	readonly nickName: string;
}

export interface ICommunityProps {
	readonly communityInfo: ICommunityList;
}
