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

const CommunityContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("community");
	const setSelectedCategory = useSetRecoilState(searchCriteria);

	const getCommunityList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url,
		});

		if (response && response.status === 200) {
			return response.data.items;
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
		};
	}, []);

	return (
		<div>
			<CommunityTab />
			<LocationWithCreate />
			<CommunitySearch />
			{data.length !== 0 ? (
				<CommunityList communityList={data} />
			) : (
				<NonExistsCommunityList />
			)}
		</div>
	);
};

export default CommunityContainer;
