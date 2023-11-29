import { atom } from "recoil";

export const mentorState = atom<boolean>({
	key: "mentorState",
	default: false,
});
