export interface IComments {
	readonly id: string;
	readonly comment: string;
	readonly nickName: string;
	readonly uploadUrl: string;
	readonly uploadFolder: string;
	readonly userUploadFolder: string;
	readonly userUploadUrl: string;
	readonly post: {
		readonly id: number;
		readonly category: string;
		readonly title: string;
		readonly content: string;
		readonly uploadUrl: string;
		readonly uploadFolder: string;
		readonly postLikesCount: number;
		readonly commentCount: number;
		readonly countWatch: number;
		readonly registerDatetime: string;
		readonly updateDatetime: string;
		readonly user: {
			readonly id: 0;
			readonly nickName: string;
			readonly uploadUrl: string;
			readonly uploadFolder: string;
		};
	};
	readonly registerDatetime: string;
	readonly updateDatetime: string;
	readonly owner: boolean;
}

export interface ICommentsProps {
	readonly comments: IComments[];
}

export interface ICommentProps {
	readonly comment: IComments;
}
