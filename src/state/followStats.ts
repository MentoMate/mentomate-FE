import { atom } from "recoil";

interface ILikeAndCommentCnt {
	readonly postLikeCnt: number;
	readonly commentCnt: number;
}

export const followState = atom<boolean>({
	key: "followState",
	default: false,
});

export const communityLike = atom<boolean>({
	key: "communityLike",
	default: false,
});

export const communityLikeAndCommentCnt = atom<ILikeAndCommentCnt>({
	key: "communityLikeAndCommentCnt",
	default: {
		postLikeCnt: 0,
		commentCnt: 0,
	},
});
