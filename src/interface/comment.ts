export interface IComments {
	readonly id: string;
	readonly comment: string;
	readonly nickName: string;
	readonly uploadUrl: string;
	readonly uploadFolder: string;
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
			readonly email: string;
			readonly emailAuth: string;
			readonly emailAuthDate: string;
			readonly password: string;
			readonly socialId: string;
			readonly socialType: string;
			readonly refreshToken: string;
			readonly lastLogin: string;
			readonly name: string;
			readonly career: number;
			readonly introduce: string;
			readonly mainCategory: string;
			readonly middleCategory: string;
			readonly uploadUrl: string;
			readonly uploadFolder: string;
			readonly rating: number;
			readonly registerDate: string;
			readonly updateDate: string;
			readonly deleteDate: string;
		};
	};
	readonly registerDatetime: string;
	readonly updateDatetime: string;
}

export interface ICommentsProps {
	readonly comments: IComments[];
}

export interface ICommentProps {
	readonly comment: IComments;
}
