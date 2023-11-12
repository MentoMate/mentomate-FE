import { atom } from "recoil";

interface ISearchCriteria {
	readonly sortBy: string;
	readonly keyword: string;
	readonly category: string;
	readonly searchType: string;
}

const INITIAL_VALUE = {
	sortBy: "latest",
	keyword: "",
	category: "",
	searchType: "title",
};

export const searchCriteria = atom<ISearchCriteria>({
	key: "searchCriteria",
	default: INITIAL_VALUE,
});
