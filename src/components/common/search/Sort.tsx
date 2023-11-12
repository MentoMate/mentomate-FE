import { searchCriteria } from "@/state/searchCriteria";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

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
			key: "like",
			sortName: "좋아요수",
		},
		{
			key: "comment",
			sortName: "댓글수",
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
	const [sortType, setSortType] = useState<ISort[]>([
		{
			key: "init",
			sortName: "init",
		},
	]);

	const onClickSortTypeHandler = (key: string) => {
		if (selectedType !== key) {
			setSelectedType(key);
			setSelectedSearchCriteria({ ...selectedSearchCriteria, sortBy: key });
		}
	};

	const checkPathHandler = (path: string) => {
		if (path === "/mentoring") {
			setSelectedType(SORT_TYPES["mentoring"][0].key);
			setSortType(SORT_TYPES["mentoring"]);
		} else if (path === "/mentor") {
			setSelectedType(SORT_TYPES["mentor"][0].key);
			setSortType(SORT_TYPES["mentor"]);
		} else if (path === "/community") {
			setSelectedType(SORT_TYPES["community"][0].key);
			setSortType(SORT_TYPES["community"]);
		}
	};

	useEffect(() => {
		const path = location.pathname;
		checkPathHandler(path);
	}, [location]);

	return (
		<>
			<div className="flex">
				{sortType.map((sort: ISort) => (
					<div
						key={sort.key}
						onClick={() => onClickSortTypeHandler(sort.key)}
						className={`flex justify-center items-center mx-1 w-[5rem] h-[2.5rem] ${
							selectedType === sort.key
								? "bg-main-color text-white text-bold"
								: "bg-white border border-black-200 text-black-500"
						} rounded-3xl text-sm cursor-pointer`}
					>
						{sort.sortName}
					</div>
				))}
			</div>
		</>
	);
};

export default Sort;
