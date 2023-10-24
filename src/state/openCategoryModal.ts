import { atom } from "recoil";

const initialValue: boolean = false;

export const openCategoryModalState = atom<boolean>({
	key: "openCategoryModalState",
	default: initialValue,
});
