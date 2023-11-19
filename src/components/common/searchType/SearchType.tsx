import { searchCriteria } from "@/state/searchCriteria";
import { ReactComponent as BottomArrow } from "@assets/svg/bottom_arrow.svg";
import { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";

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
	const [selectedSearchCriteria, setSelectedSearchCriteria] =
		useRecoilState(searchCriteria);
	const [type, setType] = useState<ISearchTypes>(SEARCH_TYPES[0]);
	const [openSearchTypeList, setOpenSearchTypeList] = useState<boolean>(false);
	const searchTypeListRef = useRef<HTMLUListElement>(null);

	const onClickSearchTypeList = () => {
		setOpenSearchTypeList(!openSearchTypeList);
	};

	const onClickSearchType = (searchType: ISearchTypes) => {
		setType(searchType);
		setOpenSearchTypeList(false);
		setSelectedSearchCriteria({
			...selectedSearchCriteria,
			searchType: searchType.key,
		});
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				searchTypeListRef.current &&
				!searchTypeListRef.current.contains(e.target as Node)
			) {
				setOpenSearchTypeList(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [searchTypeListRef]);

	return (
		<div
			className="flex justify-center items-center relative sm:mt-0 mt-2 py-1 px-4 sm:w-[6rem] w-full bg-white hover:bg-black-100 border border-black-200 rounded-[0.3rem] text-[0.8rem] cursor-pointer transition duration-150"
			onClick={onClickSearchTypeList}
		>
			<div className="grow flex justify-center items-center text-main-color text-center font-semibold">
				{type.keyName}
			</div>
			<BottomArrow
				width={20}
				height={20}
				fill="#3C3C3C"
				className={`${
					!openSearchTypeList ? "rotate-0" : "rotate-180"
				} transition-transform duration-500`}
			/>
			{openSearchTypeList && (
				<ul
					ref={searchTypeListRef}
					className="absolute top-[2.7rem] sm:w-[6rem] w-full bg-white border border-black-200 rounded-[0.3rem] z-[51] shadow-md"
				>
					{SEARCH_TYPES.map((searchType, index) => (
						<li
							className={`py-2 bg-white shadow-sm hover:bg-main-color text-center  hover:text-white ${
								index === 0
									? "rounded-t-[0.3rem] border-b"
									: "rounded-b-[0.3rem]"
							}`}
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
