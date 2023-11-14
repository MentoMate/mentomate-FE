import { atom } from "recoil";

interface IMentoringEditForm {
	readonly mentoringId: number;
	readonly startDate: Date;
	readonly endDate: Date;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly category: string;
	readonly content: string;
	readonly title: string;
	readonly uploadFolder: string;
	readonly thumbNailImg: File | null;
	readonly thumbNailImgUrl: string;
}

const INITIAL_VALUE: IMentoringEditForm = {
	mentoringId: 0,
	startDate: new Date(),
	endDate: new Date(),
	numberOfPeople: 0,
	amount: 0,
	category: "all",
	content: "",
	title: "",
	uploadFolder: "",
	thumbNailImg: null,
	thumbNailImgUrl: "",
};

export const mentoringEditForm = atom<IMentoringEditForm>({
	key: "mentoringEditForm",
	default: INITIAL_VALUE,
});
