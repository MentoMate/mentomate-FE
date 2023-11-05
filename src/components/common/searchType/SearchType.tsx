import { ReactComponent as BottomArrow } from "@assets/svg/bottom_arrow.svg";
import { useRef, useState } from "react";

interface ISearchTypes {
	readonly key: string;
	readonly keyName: string;
}

const SEARCH_TYPES = [
	{
		key: "title",
		keyName: "제목",
	},
	{
		key: "writer",
		keyName: "작성자",
	},
];

const SearchType = () => {
	const [type, setType] = useState<ISearchTypes>(SEARCH_TYPES[0]);
	const [openSearchTypeList, setOpenSearchTypeList] = useState<boolean>(false);
	const searchTypeListRef = useRef<HTMLUListElement>(null);

	const onClickSearchTypeList = () => {
		setOpenSearchTypeList(!openSearchTypeList);
	};

	const onClickSearchType = (searchType: ISearchTypes) => {
		setType(searchType);
		setOpenSearchTypeList(false);
	};

	return (
		<div
			className="flex justify-center items-center relative sm:mt-0 mt-2 py-2 px-4 sm:w-[10rem] w-full border border-black-200 rounded-sm cursor-pointer"
			onClick={onClickSearchTypeList}
		>
			<div className="grow flex justify-center items-center text-black-600 w-[5rem] text-center">
				{type.keyName}
			</div>
			<BottomArrow width={30} height={30} fill="#3C3C3C" />
			{openSearchTypeList && (
				<ul
					ref={searchTypeListRef}
					className="absolute top-12 sm:w-[10rem] w-full bg-white border border-black-200 rounded-sm"
				>
					{SEARCH_TYPES.map((searchType) => (
						<li
							className="text-center py-2 shadow-sm hover:bg-main-color hover:text-white"
							onClick={() => onClickSearchType(searchType)}
						>
							{searchType.keyName}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchType;
