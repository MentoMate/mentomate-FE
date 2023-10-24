import { useState } from "react";

const sortTypes = [
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
];

const Sort = () => {
	const [selectedType, setSelectedType] = useState<string>("latest");

	const onClickSortTypeHandler = (key: string) => {
		if (selectedType !== key) {
			setSelectedType(key);
		}
	};

	return (
		<>
			<div className="flex">
				{sortTypes.map((sort) => (
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
