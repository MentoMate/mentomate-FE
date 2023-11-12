import { atom, selector } from "recoil";
import { searchCriteria } from "./searchCriteria";

export const mentoringPageUrl = atom<string>({
	key: "mentoringPageUrl",
	default: "/mentoring/search?sortBy=latest&page=1&pageSize=12",
});

export const mentoringUrlSelector = selector<string>({
	key: "mentoringUrlSelector",
	get: ({ get }) => {
		const category = get(searchCriteria).category;
		const keyword = get(searchCriteria).keyword;
		const sortBy = get(searchCriteria).sortBy;
		const searchType = get(searchCriteria).searchType;

		let url = "/mentoring/search?sortBy=latest&page=1&pageSize=12";

		if (keyword !== "") {
			url = `/mentoring/search?sortBy=${sortBy}&searchType=${searchType}&searchText=${searchType}&page=1&pageSize=12`;
		}

		if (category !== "") {
			url = `/mentoring/search?sortBy=${sortBy}&searchCategory=${category}&page=1&Size=12`;
		}

		if (keyword !== "" && category !== "") {
			url = `/mentoring/search?sortBy=${sortBy}&searchType=${searchType}&searchCategory=${category}&searchText=${searchType}&page=1&pageSize=12`;
		}

		return url;
	},
});
