import { atom } from "recoil";

export const openChatModalState = atom<boolean>({
	key: "openChat",
	default: false,
});

export const selectedPrivateChatId = atom<number | null>({
	key: "selectedPrivateChatId",
	default: null,
});

export const openGroupChatModalState = atom<boolean>({
	key: "openGroupChat",
	default: false,
});
