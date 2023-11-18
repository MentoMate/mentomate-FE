import { atom } from "recoil";

export interface IGroupChatHistory {
	readonly groupMentoringId: number;
	readonly senderNickName: string;
	readonly senderUserId: number;
	readonly message: string;
	readonly registerDatetime: string;
}

export const groupChatHistory = atom<IGroupChatHistory[]>({
	key: "groupChatHistory",
	default: [],
});
