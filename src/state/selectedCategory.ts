import { atom } from "recoil";

interface IinitialValue {
	selectedCategoryType: string;
	selectedCategory: string;
	selectedCategoryName: string;
}

const initialValue: IinitialValue = {
	selectedCategoryType: "all",
	selectedCategory: "all",
	selectedCategoryName: "카테고리 전체",
};

export const selectedCategoryState = atom<IinitialValue>({
	key: "selectedCategory",
	default: initialValue,
});
