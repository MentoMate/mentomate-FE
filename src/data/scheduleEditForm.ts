import { atom } from "recoil";

interface IScheduleEditForm {
	readonly scheduleId: number;
	readonly mentoringId: number;
	readonly title: string;
	readonly content: string;
	readonly start: string;
	readonly uploadFolder: string;
}

const INITIAL_VALUE: IScheduleEditForm = {
	mentoringId: 3,
	title: "",
	content: "",
	start: "",
	uploadFolder: "",
	scheduleId: 1,
};

export const scheduleEditForm = atom<IScheduleEditForm>({
	key: "scheduleEditForm",
	default: INITIAL_VALUE,
});
