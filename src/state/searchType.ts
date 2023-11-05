import { atom } from "recoil";

interface mentoringSearchType {
	readonly key: string;
	readonly keyName: string;
}

export const mentoringSearchType = atom<mentoringSearchType>({
	key: "mentoringSearchType",
	default: { key: "latest", keyName: "최신순" },
});
