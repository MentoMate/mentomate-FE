import { atom } from "recoil";

export const pagination = atom<number>({
	key: "pagination",
	default: 1,
});
