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

		if (response && response.status === 200) {
			return response.data;
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
		<div className="h-min-height">
			<CommunityTab />
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<div className="mt-12">
					<SortAndSearch />
				</div>
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
