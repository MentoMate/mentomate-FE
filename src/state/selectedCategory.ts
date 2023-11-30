import { atom } from "recoil";

interface IInitialValue {
	readonly selectedCategoryType: string;
	readonly selectedCategory: string;
	readonly selectedCategoryName: string;
}

const initialValue: IInitialValue = {
	selectedCategoryType: "all",
	selectedCategory: "all",
	selectedCategoryName: "카테고리 전체",
};

export const selectedCategoryState = atom<IInitialValue>({
	key: "selectedCategory",
	default: initialValue,
});
