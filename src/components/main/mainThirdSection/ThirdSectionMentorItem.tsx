import { categories } from "@/constants/categories";
import { IMentorItem } from "@/interface/mainPageMentor";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { useEffect, useState } from "react";

interface IProps {
	readonly mentorCard: IMentorItem;
}

const ThirdSectionMentorItem = ({ mentorCard }: IProps) => {
	const [categoryName, setCategoryName] = useState<string>("");

	const getCategoryName = (
		mainCategory: string | null,
		middleCategory: string | null,
	) => {
		if (!mainCategory || !middleCategory) {
			return "없음";
		} else {
			const categoryData = categories[mainCategory];

			if (categoryData) {
				const category = categoryData.find(
					(item) => item.key === middleCategory,
				);
				return category ? category.categoryName : "없음";
			} else {
				return "없음";
			}
		}
	};

	const init = () => {
		const mainCategory = mentorCard.mainCategory;
		const middleCategory = mentorCard.middleCategory;

		const categoryName = getCategoryName(mainCategory, middleCategory);
		setCategoryName(categoryName);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="mt-8 py-4 w-[14rem] bg-white border border-black-100 shadow-sm hover:shadow-lg border-b rounded-t-lg text-black-500 duration-100 hover:scale-105">
			<img
				src={mentorCard.uploadUrl}
				alt="mentorThumbNail"
				className="mx-auto w-[8rem] h-[8rem] rounded-full object-cover"
			/>
			<div className="flex justify-center items-center mt-6 mb-1 text-[0.8rem] font-semibold text-main-color">
				{categoryName}
			</div>
			<div className="flex justify-center items-center">
				<div className="flex justify-center items-center px-2 py-1">
					<Star width={13} height={13} className="mr-1" />
					<div className="font-semibold text-[0.8rem]">
						{mentorCard.rating === null ? "0.0" : mentorCard.rating}
					</div>
				</div>
				<p className="ml-3 text-md font-medium">
					{mentorCard.name}
					<span className="text-[0.8rem] text-black-400">멘토</span>
				</p>
			</div>
		</div>
	);
};

export default ThirdSectionMentorItem;
