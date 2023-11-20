import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Pagination from "../common/pagination/Pagination";
import SortAndSearch from "../common/search/SortAndSearch";
import CommunityTab from "./CommunityTab";
import LocationWithCreate from "./LocationWithCreate";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";
import { alertHandler } from "@/utils/alert";
console.log("asd");
const CommunityContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("post");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getCommunityList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				return {
					items: [],
					totalPages: 1,
				};
			}
		}
	};

	const { data } = useQuery(["communityList", url], getCommunityList);

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
		<div className="h-min-height bg-black-100">
			<div className="sticky top-20 z-50">
				<CommunityTab />
				<SortAndSearch />
			</div>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<LocationWithCreate />
				{data.items.length !== 0 ? (
					<>
						<CommunityList communityList={data.items} />
						<Pagination totalPages={data.totalPages} />
					</>
				) : (
					<NonExistsCommunityList />
				)}
			</div>
		</div>
	);
};

export default CommunityContainer;
