import CommunitySearch from "./communitySearch/CommunitySearch";
import CommunityTab from "./CommunityTab";
import CommunityList from "./communityList/CommunityList";
import NonExistsCommunityList from "./communityList/NonExistsCommunityList";

const CommnunityContainer = () => {
	const test = 1;

	return (
		<div>
			<CommunityTab />
			<CommunitySearch />
			{test === 1 ? <NonExistsCommunityList /> : <CommunityList />}
		</div>
	);
};

export default CommnunityContainer;
