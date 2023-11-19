import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ReactComponent as BottomArrow } from "@assets/svg/bottom_arrow.svg";

const SORT_TYPES = {
	mentoring: [
		{
			key: "latest",
			sortName: "최신순",
		},
		{
			key: "grade",
			sortName: "평점순",
		},
		{
			key: "price",
			sortName: "금액순",
		},
	],
	mentor: [
		{
			key: "latest",
			sortName: "최신순",
		},
		{
			key: "hot",
			sortName: "팔로워순",
		},
		{
			key: "grade",
			sortName: "평점순",
		},
	],
	community: [
		{
			key: "latest",
			sortName: "최신순",
		},
		{
			key: "likes",
			sortName: "좋아요수",
		},
	],
};

interface ISort {
	readonly key: string;
	readonly sortName: string;
}

const Sort = () => {
	const location = useLocation();
	const [selectedSearchCriteria, setSelectedSearchCriteria] =
		useRecoilState(searchCriteria);
	const [selectedType, setSelectedType] = useState<string>("");
	const [selectedSort, setSelectedSort] = useState<ISort>({
		key: "init",
		sortName: "init",
	});
	const [sortType, setSortType] = useState<ISort[]>([
		{
			key: "init",
			sortName: "init",
		},
	]);
	const [isOpenSort, setIsOpenSort] = useState<boolean>(false);

	const onClickSortTypeHandler = (sort: ISort) => {
		if (selectedType !== sort.key) {
			setSelectedType(sort.key);
			setSelectedSort(sort);
			setSelectedSearchCriteria({
				...selectedSearchCriteria,
				sortBy: sort.key,
			});
		}
	};

	const checkPathHandler = (path: string) => {
		if (path === "/mentoring") {
			setSelectedType(SORT_TYPES["mentoring"][0].key);
			setSortType(SORT_TYPES["mentoring"]);
			setSelectedSort(SORT_TYPES["mentoring"][0]);
		} else if (path === "/mentor") {
			setSelectedType(SORT_TYPES["mentor"][0].key);
			setSortType(SORT_TYPES["mentor"]);
			setSelectedSort(SORT_TYPES["mentor"][0]);
		} else if (path === "/community") {
			setSelectedType(SORT_TYPES["community"][0].key);
			setSortType(SORT_TYPES["community"]);
			setSelectedSort(SORT_TYPES["community"][0]);
		}
	};

	useEffect(() => {
		const path = location.pathname;
		checkPathHandler(path);
	}, [location]);

	return (
		<>
			<div
				className="flex justify-center items-center relative sm:mt-0 mt-2 py-1 px-4 sm:w-[6rem] w-full border border-black-200 rounded-[0.3rem] text-[0.75rem] cursor-pointer"
				onClick={() => setIsOpenSort(!isOpenSort)}
			>
				<div className="grow flex justify-center items-center text-main-color text-center">
					{selectedSort.sortName}
				</div>
				<BottomArrow
					width={20}
					height={20}
					fill="#3C3C3C"
					className={`${
						!isOpenSort ? "rotate-0" : "rotate-180"
					} transition-transform duration-500`}
				/>
				{isOpenSort && (
					<ul className="absolute top-[2.7rem] sm:w-[6rem] w-full bg-white border border-black-200 rounded-[0.3rem] shadow-md z-[51]">
						{sortType.map((sort: ISort, index: number) => (
							<li
								onClick={() => onClickSortTypeHandler(sort)}
								className={`py-2 bg-white shadow-sm hover:bg-main-color text-center hover:text-white ${
									index === 0
										? "rounded-t-[0.3rem]"
										: "rounded-b-[0.3rem] cursor-pointer"
								}`}
							>
								{sort.sortName}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default Sort;
