import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SOLT_TYPES = {
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
			key: "hot",
			sortName: "팔로워순",
		},
		{
			key: "grade",
			sortName: "평점순",
		},
	],
};

interface ISort {
	key: string;
	sortName: string;
}

type TSortType = ISort[];

const INITIAL_VALUE = [
	{
		key: "init",
		sortName: "init",
	},
];

const Sort = () => {
	const location = useLocation();
	const [selectedType, setSelectedType] = useState<string>("");
	const [sortType, setSortType] = useState<TSortType>(INITIAL_VALUE);

	const onClickSortTypeHandler = (key: string) => {
		if (selectedType !== key) {
			setSelectedType(key);
		}
	};

	const checkPathHandler = (path: string) => {
		if (path === "/mentoring") {
			setSelectedType(SOLT_TYPES["mentoring"][0].key);
			setSortType(SOLT_TYPES["mentoring"]);
		} else if (path === "/mentor") {
			setSelectedType(SOLT_TYPES["mentor"][0].key);
			setSortType(SOLT_TYPES["mentor"]);
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
