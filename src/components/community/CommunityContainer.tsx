import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import CommunityTab from "./CommunityTab";
import LocationWithCreate from "./LocationWithCreate";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";
import CommunitySearch from "./communitySearch/CommunitySearch";

const CommunityContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const getCommunityList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/posts",
		});

		if (response && response.status === 200) {
			return response.data.content;
		}
	};

	const { data } = useQuery(["communityList"], getCommunityList);

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
