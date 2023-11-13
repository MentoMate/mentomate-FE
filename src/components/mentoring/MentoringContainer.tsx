import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import ScrollTopBtn from "../common/scrollTopBtn/ScrollTopBtn";
import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const MentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("mentoring");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getMentoringList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url,
			method: "GET",
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["mentoringList", url], getMentoringList);
	const {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	} = usePagination(data.totalPages);

	useEffect(() => {
		return () => {
			setSelectedCategory({
				sortBy: "latest",
				keyword: "",
				category: "",
				searchType: "title",
			});
			setPagination(1);
		};
	}, []);

	return (
		<>
			<div className="mt-12 h-min-height">
				<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
					<SortAndSearch />
					<MentoringTitle />
					{data.items.length === 0 ? (
						<NonExistMentoringList />
					) : (
						<>
							<MentoringList data={data.items} />
							<div className="my-12 h-20 flex justify-center items-center">
								<button
									type="button"
									onClick={() => onClickNextOrPrevBtnHandler("prev")}
									disabled={currentPage === 1 ? true : false}
									className="mr-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white"
								>
									이전
								</button>
								{pageArray.map((page: number) => (
									<div
										key={page}
										className={`mx-1 text-lg ${
											currentPage === page
												? "text-main-color font-semibold"
												: "text-black"
										} cursor-pointer`}
										onClick={() => onClickPageHandler(page)}
									>
										{page}
									</div>
								))}
								<button
									type="button"
									onClick={() => onClickNextOrPrevBtnHandler("next")}
									disabled={currentPage === data.totalPages ? true : false}
									className="ml-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white "
								>
									다음
								</button>
							</div>
						</>
					)}
				</div>
				<ScrollTopBtn />
			</div>
		</>
	);
};

export default MentoringContainer;
