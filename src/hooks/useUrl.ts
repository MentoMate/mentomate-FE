import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useUrl = (url: string) => {
	const selectedSearchCriteria = useRecoilValue(searchCriteria);
	const [finalUrl, setFinalUrl] = useState<string>(url);

	const transformationUrl = () => {
		const sortBy = selectedSearchCriteria.sortBy;
		const searchType = selectedSearchCriteria.searchType;
		const keyword = selectedSearchCriteria.keyword;
		const category = selectedSearchCriteria.category;

		if (sortBy !== "") {
			setFinalUrl(`/mentoring/search?sortBy=${sortBy}&page=1&pageSize=12`);
			return;
		}

		if (keyword !== "") {
			setFinalUrl(
				`/mentoring/search?sortBy=${sortBy}&searchType=${searchType}&searchText=${searchType}&page=1&pageSize=12`,
			);
			return;
		}

		if (category !== "") {
			setFinalUrl(
				`/mentoring/search?sortBy=${sortBy}&searchCategory=${category}&page=1&Size=12`,
			);
			return;
		}

		if (keyword !== "" && category !== "") {
			setFinalUrl(
				`/mentoring/search?sortBy=${sortBy}&searchType=${searchType}&searchCategory=${category}&searchText=${searchType}&page=1&pageSize=12`,
			);
			return;
		}
	};

	useEffect(() => {
		transformationUrl();
		console.log(selectedSearchCriteria);
	}, [selectedSearchCriteria]);

	return { finalUrl };
};

export default useUrl;
