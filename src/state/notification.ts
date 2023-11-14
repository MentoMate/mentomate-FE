import { atom } from "recoil";

export const notification = atom<number>({
	key: "notification",
	default: 0,
});
