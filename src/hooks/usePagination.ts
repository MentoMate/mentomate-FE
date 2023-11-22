import { pagination } from "@/state/pagination";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

const usePagination = (pageCnt: number) => {
	const [pageArray, setPageArray] = useState<number[]>([]);
	const [currentPage, setCurrentPage] = useRecoilState(pagination);

	const initMakePagination = () => {
		const pageArr = new Array();

		if (pageCnt <= 5) {
			for (let i = 1; i <= pageCnt; i++) {
				pageArr.push(i);
			}
		}

		if (pageCnt > 5) {
			for (let i = currentPage; i <= currentPage + 4; i++) {
				pageArr.push(i);
			}
		}

		setPageArray(pageArr);
	};

	const onClickPageHandler = (page: number) => {
		setCurrentPage(page);
	};

	const onClickNextOrPrevBtnHandler = (type: string) => {
		if (type === "prev") {
			setCurrentPage(currentPage - 1);
		}
		if (type === "next") {
			setCurrentPage(currentPage + 1);
		}

		if (type === "start") {
			setCurrentPage(1);
		}

		if (type === "end") {
			setCurrentPage(pageCnt);
		}
	};

	useEffect(() => {
		initMakePagination();
	}, [pageCnt]);

	useEffect(() => {
		initMakePagination();
	}, [currentPage]);

	return {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	};
};

export default usePagination;
