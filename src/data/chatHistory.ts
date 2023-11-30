import { atom } from "recoil";

interface IChatHistory {
	readonly privateChatRoomId: number;
	readonly senderNickName: string;
	readonly message: string;
	readonly registerDatetime: string;
	readonly senderUserId: number;
}

export const chatHistory = atom<IChatHistory[]>({
	key: "chatHistory",
	default: [],
});
