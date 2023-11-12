import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useUrl = (type: string) => {
	const selectedSearchCriteria = useRecoilValue(searchCriteria);
	const [url, setUrl] = useState<string>(
		"/mentoring/search?sortBy=latest&page=1&pageSize=16",
	);

	const checkPageLocation = () => {
		let pageLocation = "";

		if (type === "mentoring") {
			pageLocation = "mentoring";
		}

		if (type === "mentor") {
			pageLocation = "mentor";
		}

		if (type === "community") {
			pageLocation = "post";
		}

		return pageLocation;
	};

	const transformationUrl = () => {
		const pageLocation = checkPageLocation();

		const sortBy = selectedSearchCriteria.sortBy;
		const searchType = selectedSearchCriteria.searchType;
		const keyword = selectedSearchCriteria.keyword;
		const category =
			pageLocation === "post" ? "default" : selectedSearchCriteria.category;

		if (sortBy !== "") {
			setUrl(`/${pageLocation}/search?sortBy=${sortBy}&page=1&pageSize=16`);
		}

		if (keyword !== "") {
			setUrl(
				`/${pageLocation}/search?sortBy=${sortBy}&searchType=${searchType}&searchText=${keyword}&page=1&pageSize=16`,
			);
		}

		if (category !== "") {
			setUrl(
				`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&page=1&Size=16`,
			);
		}

		if (keyword !== "" && category !== "") {
			setUrl(
				`/${pageLocation}/search?sortBy=${sortBy}&searchType=${searchType}&searchCategory=${category}&searchText=${keyword}&page=1&pageSize=16`,
			);
		}
	};

	useEffect(() => {
		transformationUrl();
	}, [selectedSearchCriteria]);

	return { url };
};

export default useUrl;
