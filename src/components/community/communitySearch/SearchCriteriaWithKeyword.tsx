import Keyword from "@components/common/search/Keyword";
import { ReactComponent as BottomArrow } from "@assets/svg/bottom_arrow.svg";
import { ReactComponent as Category } from "@assets/svg/category.svg";
import { useState } from "react";

interface ISearchCriterialType {
	[key: string]: string;
}

const SEARCH_CRITERIAL_TYPE: ISearchCriterialType = {
	title: "제목",
	writer: "작성자",
};

const SearchCriteriaWithKeyword = () => {
	const [openSearchCriterial, setOpenSearchCriterial] =
		useState<boolean>(false);
	const [searchCriterial, setSearchCriterial] = useState<string>("title");

	const onClickSearchCriterialHandler = () => {
		setOpenSearchCriterial(!openSearchCriterial);
	};

	const selectSearchCriterialHandler = (key: string) => {
		setSearchCriterial(key);
		setOpenSearchCriterial(false);
	};

	return (
		<div className="flex sm:flex-row flex-col mt-4">
			<div className="relative">
				<div
					className="flex justify-center items-center sm:mx-2 sm:w-[10rem] h-[3.1rem] border border-black-200 rounded-sm cursor-pointer"
					onClick={onClickSearchCriterialHandler}
				>
					<Category width={30} height={30} className="md:mx-4 sm:mx-2 mx-4" />
					<div className="grow text-black-600 font-semibold text-center">
						{SEARCH_CRITERIAL_TYPE[searchCriterial]}
					</div>
					<BottomArrow
						width={30}
						height={30}
						fill="#000000"
						className="sm:mx-1 mx-4"
					/>
				</div>
				<ul
					className={`${
						openSearchCriterial ? "block" : "hidden"
					} absolute top-[3.3rem] sm:left-2 sm:w-[10rem] w-full bg-white border border-black-200 text-center cursor-pointer z-40`}
				>
					<li
						className="py-3 border-b border-black-200 hover:bg-main-color hover:text-white hover:font-semibold"
						onClick={() => selectSearchCriterialHandler("title")}
					>
						제목
					</li>
					<li
						className="py-3 hover:bg-main-color hover:text-white hover:font-semibold"
						onClick={() => selectSearchCriterialHandler("writer")}
					>
						작성자
					</li>
				</ul>
			</div>
			<Keyword />
		</div>
	);
};
export default SearchCriteriaWithKeyword;
