import CommunitySearch from "./communitySearch/CommunitySearch";
import CommunityTab from "./CommunityTab";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";
import LocationWithCreate from "./LocationWithCreate";
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookies";

const CommnunityContainer = () => {
	const test = 0;

	const testd = async () => {
		const response = await axios.get("/api/posts", {
			headers: {
				Authorization: `Bearer ${getCookie("accessToken")}`,
			},
		});

		console.log(response);
	};

	useEffect(() => {
		testd();
	}, []);

	return (
		<div>
			<CommunityTab />
			<LocationWithCreate />
			<CommunitySearch />
			{test === 0 ? <CommunityList /> : <NonExistsCommunityList />}
		</div>
	);
};

export default CommnunityContainer;
