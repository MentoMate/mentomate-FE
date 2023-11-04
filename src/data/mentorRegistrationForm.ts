import { atom } from "recoil";

interface IMentorRegistrationForm {
	readonly name: string;
	readonly careerYear: number;
	readonly careerMonth: number;
	readonly introduceContent: string;
	readonly img: null | File;
}

const INITIAL_VALUE: IMentorRegistrationForm = {
	name: "",
	careerYear: 0,
	careerMonth: 0,
	introduceContent: "",
	img: null,
};

export const mentorRegistrationForm = atom<IMentorRegistrationForm>({
	key: "mentorRegistrationForm",
	default: INITIAL_VALUE,
});