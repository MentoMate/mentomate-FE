import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import CommunityTab from "./CommunityTab";
import LocationWithCreate from "./LocationWithCreate";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";
import CommunitySearch from "./communitySearch/CommunitySearch";
import useUrl from "@/hooks/useUrl";
import { useEffect } from "react";
import { searchCriteria } from "@/state/searchCriteria";
import { useSetRecoilState } from "recoil";
import { pagination } from "@/state/pagination";
import usePagination from "@/hooks/usePagination";

const CommunityContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("community");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getCommunityList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["communityList", url], getCommunityList);
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
		<div>
			<CommunityTab />
			<LocationWithCreate />
			<CommunitySearch />
			{data.items.length !== 0 ? (
				<>
					<CommunityList communityList={data.items} />
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
			) : (
				<NonExistsCommunityList />
			)}
		</div>
	);
};

export default CommunityContainer;
