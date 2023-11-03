import { atom } from "recoil";

interface IMentoringEditForm {
	startDate: Date;
	endDate: Date;
	numberOfPeople: number;
	amount: number;
	category: string;
	content: string;
	title: string;
}

const INITIAL_VALUE: IMentoringEditForm = {
	startDate: new Date(),
	endDate: new Date(),
	numberOfPeople: 0,
	amount: 0,
	category: "all",
	content: "",
	title: "",
};

export const mentoringEditForm = atom<IMentoringEditForm>({
	key: "mentoringEditForm",
	default: INITIAL_VALUE,
});
