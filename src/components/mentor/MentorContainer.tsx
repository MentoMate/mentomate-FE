import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import SortAndSearch from "@components/common/search/SortAndSearch";
import { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import NonExistMentoringList from "../mentoring/mentoringList/NonExistMentoringList";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentoringList/MentorList";

const MentorContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("mentor");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getMentorList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["mentorList", url], getMentorList);
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
		<Suspense fallback={<Loading />}>
			<div>
				<MentorRegister />
				<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
					<SortAndSearch />
					{data.length !== 0 ? (
						<>
							<MentorList mentorList={data.items} />
							<div className="my-12 h-20 flex justify-center items-center">
								<button
									type="button"
									onClick={() => onClickNextOrPrevBtnHandler("prev")}
									disabled={currentPage === 1 ? true : false}
									className="mr-3 px-2 py-1.5 bg-black-300 hover:bg-black-400 disabled:bg-black-500 rounded-md text-white"
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
									className="ml-3 px-2 py-1.5 bg-black-300 hover:bg-black-400 disabled:bg-black-500 rounded-md text-white "
								>
									다음
								</button>
							</div>
						</>
					) : (
						<NonExistMentoringList />
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default MentorContainer;
