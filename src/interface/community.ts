export interface ICommunityItem {
	readonly id: number;
	readonly postId: number;
	readonly commentCount: number;
	readonly countWatch: number;
	readonly category: string;
	readonly title: string;
	readonly content: string;
	readonly writer: string;
	readonly postLikesCount: number;
	readonly registerDatetime: Date;
	readonly updateDatetime: Date;
	readonly uploadFolder: string;
	readonly uploadUrl: string;
	readonly nickName: string;
	readonly owner: boolean;
	readonly like: boolean;
	readonly userUploadFolder: string;
	readonly userUploadUrl: string;
}

export interface ICommunityProps {
	readonly communityInfo: ICommunityItem;
}

export interface ITabs {
	readonly key: string;
	readonly tabName: string;
}
