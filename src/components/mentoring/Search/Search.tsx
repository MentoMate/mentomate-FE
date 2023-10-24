import Category from "./Category";
import Keyword from "./Keyword";
import Sort from "./Sort";

const Search = () => {
	return (
		<div className="mt-12">
			<Sort />
			<div className="flex mt-4">
				<Category />
				<Keyword />
			</div>
		</div>
	);
};

export default Search;
