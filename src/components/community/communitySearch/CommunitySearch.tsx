import Sort from "@components/common/search/Sort";
import SearchCriteriaWithKeyword from "./SearchCriteriaWithKeyword";

const CommunitySearch = () => {
	return (
		<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[20rem]">
			<div className="flex flex-col mt-8 mx-8">
				<Sort />
				<SearchCriteriaWithKeyword />
			</div>
		</div>
	);
};

export default CommunitySearch;
