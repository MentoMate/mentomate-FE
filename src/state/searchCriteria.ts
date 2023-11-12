import { atom } from "recoil";

interface ISearchCriteria {
	readonly sortBy: string;
	readonly keyword: string;
	readonly category: string;
	readonly searchType: string;
}

const INITIAL_VALUE = {
	sortBy: "",
	keyword: "",
	category: "",
	searchType: "",
};

export const searchCriteria = atom<ISearchCriteria>({
	key: "searchCriteria",
	default: INITIAL_VALUE,
});
