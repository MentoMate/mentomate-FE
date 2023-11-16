import { atom } from "recoil";

export const openChatState = atom<boolean>({
	key: "openChat",
	default: false,
});
