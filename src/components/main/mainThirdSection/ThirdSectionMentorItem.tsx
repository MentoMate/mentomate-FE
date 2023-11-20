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
		<div className="mt-12 w-[14rem] bg-black-100 rounded-lg duration-100 hover:scale-105">
			<img
				src={mentorCard.uploadUrl}
				alt="mentorThumbNail"
				className="w-full h-[15rem] rounded-t-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2 text-sm font-bold">
				{categoryName}
			</div>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">
						{mentorCard.rating ? mentorCard.rating : "0"}
					</div>
				</div>
				<div className="ml-3 text-md font-semibold">{mentorCard.name} 멘토</div>
			</div>
			<p className="w-[13rem] h-[3rem] mx-3 mt-2 mb-4 font-semibold title-overflow">
				{mentorCard.introduce
					? mentorCard.introduce.replace(/<\/?[^>]+(>|$)/g, "")
					: ""}
			</p>
		</div>
	);
};

export default ThirdSectionMentorItem;
