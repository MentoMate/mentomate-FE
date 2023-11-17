import SearchType from "@/components/common/searchType/SearchType";
import Keyword from "@components/common/search/Keyword";

const SearchCriteriaWithKeyword = () => {
	return (
		<div className="flex sm:flex-row flex-col items-center mt-4">
			<SearchType />
			<Keyword />
		</div>
	);
};
export default SearchCriteriaWithKeyword;
