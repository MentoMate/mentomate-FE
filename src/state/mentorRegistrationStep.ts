import { atom } from "recoil";

export const registrationStep = atom<number>({
	key: "registrationStep",
	default: 1,
});
