import { atom } from "recoil";

interface IMentoringRegistrationForm {
	readonly title: string;
	readonly content: string;
	readonly startDate: Date;
	readonly endDate: Date;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly category: string;
}

const INITIAL_VALUE: IMentoringRegistrationForm = {
	title: "",
	content: "",
	startDate: new Date(),
	endDate: new Date(),
	numberOfPeople: 0,
	amount: 0,
	category: "",
};

export const mentoringRegistrationData = atom<IMentoringRegistrationForm>({
	key: "mentoringRegistrationData",
	default: INITIAL_VALUE,
});
