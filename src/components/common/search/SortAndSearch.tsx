import { useLocation } from "react-router-dom";
import SearchType from "../searchType/SearchType";
import Category from "./Category";
import Keyword from "./Keyword";
import Sort from "./Sort";

console.log("asd");

const SortAndSearch = () => {
	const location = useLocation();

	return (
		<div>
			<Sort />
			<div className="flex flex-col lg:flex-row mt-4">
				<div className="flex sm:flex-row flex-col">
					<Category />
					{location.pathname !== "/mentor" && <SearchType />}
				</div>
				<Keyword />
			</div>
		</div>
	);
};

export default SortAndSearch;
