import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useUrl = (type: string) => {
	const selectedSearchCriteria = useRecoilValue(searchCriteria);
	const currentPage = useRecoilValue(pagination);

	let INITIAL_URL = "";

	if (type === "mentoring") {
		INITIAL_URL = "/mentoring/search?sortBy=latest&page=1&pageSize=16";
	}
	if (type === "mentor") {
		INITIAL_URL = "/mentor/search?sortBy=latest&page=1&pageSize=16";
	}
	if (type === "community") {
		INITIAL_URL =
			"/post/search?sortBy=latest&searchCategory=default&page=1&pageSize=16";
	}

	const [url, setUrl] = useState<string>(INITIAL_URL);

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
			pageLocation === "post" && selectedSearchCriteria.category === ""
				? "default"
				: selectedSearchCriteria.category;

		if (pageLocation === "mentoring" || pageLocation === "post") {
			if (sortBy !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&page=${currentPage}&pageSize=15`,
				);
			}

			if (keyword !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchType=${searchType}&searchText=${keyword}&page=${currentPage}&pageSize=15`,
				);
			}

			if (category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&page=${currentPage}&Size=15`,
				);
			}

			if (keyword !== "" && category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&searchType=${searchType}&searchText=${keyword}&page=${currentPage}&pageSize=15`,
				);
			}
		}

		if (pageLocation === "mentor") {
			if (sortBy !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&page=${currentPage}&pageSize=16`,
				);
			}
			if (keyword !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchText=${keyword}&page=${currentPage}&pageSize=16`,
				);
			}

			if (category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&page=${currentPage}&Size=16`,
				);
			}

			if (keyword !== "" && category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&searchText=${keyword}&page=${currentPage}&pageSize=16`,
				);
			}
		}
	};

	useEffect(() => {
		transformationUrl();
	}, [selectedSearchCriteria, currentPage]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [currentPage]);

	return { url };
};

export default useUrl;
