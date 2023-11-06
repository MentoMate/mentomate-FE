import { atom } from "recoil";

interface ICommunityRegistrationForm {
	readonly category: string;
	readonly title: string;
	readonly content: string;
	readonly uploadFolder: string;
	readonly uploadImg: null;
	readonly thumbNailImg: File | null;
}

const INITIAL_VALUE: ICommunityRegistrationForm = {
	category: "",
	title: "",
	content: "",
	uploadFolder: "",
	uploadImg: null,
	thumbNailImg: null,
};

export const communityRegistrationForm = atom<ICommunityRegistrationForm>({
	key: "communityRegistrationForm",
	default: INITIAL_VALUE,
});
