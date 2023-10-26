import CommunitySearch from "./communitySearch/CommunitySearch";
import CommunityTab from "./CommunityTab";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";
import LocationWithCreate from "./LocationWithCreate";

const CommnunityContainer = () => {
	const test = 0;

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
