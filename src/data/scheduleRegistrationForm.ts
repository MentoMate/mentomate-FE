import { atom } from "recoil";

interface IScheduleRegistrationForm {
	readonly mentoringId: number;
	readonly title: string;
	readonly content: string;
	readonly start: string;
	readonly uploadFolder: string;
}

const INITIAL_VALUE: IScheduleRegistrationForm = {
	mentoringId: 1,
	title: "",
	content: "",
	start: "",
	uploadFolder: "",
};

export const scheduleRegistrationForm = atom<IScheduleRegistrationForm>({
	key: "scheduleRegistrationForm",
	default: INITIAL_VALUE,
});
