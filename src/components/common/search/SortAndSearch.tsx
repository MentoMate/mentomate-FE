import { useLocation } from "react-router-dom";
import SearchType from "../searchType/SearchType";
import Category from "./Category";
import Keyword from "./Keyword";
import Sort from "./Sort";

const SortAndSearch = () => {
	const location = useLocation();

	return (
		<div className="fixed py-8 mx-auto w-full bg-white border-b border-main-color z-[47]">
			<div className="flex flex-col lg:flex-row justify-between mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem] h-10">
				<div className="flex sm:flex-row flex-col">
					<Category />
					{location.pathname !== "/mentor" && <SearchType />}
					<Keyword />
				</div>
				<Sort />
			</div>
		</div>
	);
};

export default SortAndSearch;
