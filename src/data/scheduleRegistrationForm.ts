import { atom } from "recoil";

interface IScheduleRegistrationForm {
	readonly mentoringId: string;
	readonly title: string;
	readonly content: string;
	readonly startDate: string;
	readonly uploadFolder: string;
	readonly uploadImg: string | null;
}

const INITIAL_VALUE: IScheduleRegistrationForm = {
	mentoringId: "",
	title: "",
	content: "",
	startDate: "",
	uploadFolder: "",
	uploadImg: null,
};

export const scheduleRegistrationForm = atom<IScheduleRegistrationForm>({
	key: "scheduleRegistrationForm",
	default: INITIAL_VALUE,
});
