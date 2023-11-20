import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
console.log("asd");
const useUrl = (type: string, id: string | null = null) => {
	const selectedSearchCriteria = useRecoilValue(searchCriteria);
	const currentPage = useRecoilValue(pagination);

	let INITIAL_URL = "";

	if (type === "mentoring") {
		INITIAL_URL = "/mentoring/search?sortBy=latest&page=1&pageSize=16";
	}
	if (type === "mentor") {
		INITIAL_URL = "/mentor/search?sortBy=latest&page=1&pageSize=16";
	}
	if (type === "post") {
		INITIAL_URL =
			"/post/search?sortBy=latest&searchCategory=default&page=1&pageSize=15";
	}
	if (type === "comment") {
		INITIAL_URL = `/${id}/comments?page=1`;
	}

	const [url, setUrl] = useState<string>(INITIAL_URL);
	const [pageLocation] = useState<string>(type);

	const transformationUrl = () => {
		const sortBy = selectedSearchCriteria.sortBy;
		const searchType = selectedSearchCriteria.searchType;
		const keyword = selectedSearchCriteria.keyword;
		let category =
			pageLocation === "post" && selectedSearchCriteria.category === ""
				? "default"
				: selectedSearchCriteria.category;

		if (pageLocation === "post" && category === "all") {
			category = "default";
		}

		if (pageLocation === "mentoring" && category === "all") {
			category = "";
		}

		if (pageLocation === "mentoring" || pageLocation === "post") {
			const pageSize = pageLocation === "mentoring" ? 16 : 15;

			if (sortBy !== "" && keyword === "" && category === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&page=${currentPage}&pageSize=${pageSize}`,
				);
			}

			if (sortBy !== "" && keyword !== "" && category === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchType=${searchType}&searchText=${keyword}&page=${currentPage}&pageSize=${pageSize}`,
				);
			}

			if (sortBy !== "" && category !== "" && keyword === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&page=${currentPage}&pageSize=${pageSize}`,
				);
			}

			if (sortBy !== "" && keyword !== "" && category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&searchType=${searchType}&searchText=${keyword}&page=${currentPage}&pageSize=${pageSize}`,
				);
			}
		}
		if (pageLocation === "mentor") {
			if (sortBy !== "" && keyword === "" && category === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&page=${currentPage}&pageSize=16`,
				);
			}
			if (sortBy !== "" && keyword !== "" && category === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchText=${keyword}&page=${currentPage}&pageSize=16`,
				);
			}

			if (sortBy !== "" && category !== "" && keyword === "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&page=${currentPage}&pageSize=16`,
				);
			}

			if (sortBy !== "" && keyword !== "" && category !== "") {
				setUrl(
					`/${pageLocation}/search?sortBy=${sortBy}&searchCategory=${category}&searchText=${keyword}&page=${currentPage}&pageSize=16`,
				);
			}
		}

		if (pageLocation === "comment") {
			setUrl(`/${id}/comments?page=${currentPage}`);
		}
	};

	useEffect(() => {
		transformationUrl();
	}, [selectedSearchCriteria, currentPage]);

	useEffect(() => {
		if (pageLocation !== "comment") {
			window.scrollTo({ top: 0, behavior: "instant" });
		}
	}, [currentPage]);

	return { url };
};

export default useUrl;
