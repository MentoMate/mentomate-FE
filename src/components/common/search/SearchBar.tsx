import Category from "./Category";
import Keyword from "./Keyword";

const SearchBar = () => {
	return (
		<div className="flex flex-col sm:flex-row lg:flex-row mt-4">
			<Category />
			<Keyword />
		</div>
	);
};

export default SearchBar;
