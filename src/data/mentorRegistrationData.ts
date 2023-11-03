import { atom } from "recoil";

interface IMentorRegistrationForm {
	readonly name: string;
	readonly careerYear: number;
	readonly careerMonth: number;
	readonly introduceContent: string;
}

const INITIAL_VALUE: IMentorRegistrationForm = {
	name: "",
	careerYear: 0,
	careerMonth: 0,
	introduceContent: "",
};

export const mentorRegistrationData = atom<IMentorRegistrationForm>({
	key: "mentorRegistrationForm",
	default: INITIAL_VALUE,
});
