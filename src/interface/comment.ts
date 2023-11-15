export interface IComment {
	readonly id: string;
	readonly comment: string;
	readonly nickName: string;
	readonly userUploadFolder: string;
	readonly userUploadUrl: string;
	readonly registerDatetime: string;
	readonly updateDatetime: string;
	readonly owner: boolean;
}

export interface ICommentsInfo {
	readonly totalPages: number;
	readonly items: IComment[];
}

export interface ICommentsProps {
	readonly comments: ICommentsInfo;
}

export interface ICommentProps {
	readonly comment: IComment;
}
