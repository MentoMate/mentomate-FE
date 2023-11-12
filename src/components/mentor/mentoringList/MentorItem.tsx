import { categories } from "@/constants/categories";
import { IMentorItemProps } from "@/interface/mentorItem";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { useEffect, useState } from "react";

const MentorItem = ({ mentorItem }: IMentorItemProps) => {
	const [categoryName, setCategoryName] = useState<string>("");

	const getCategoryNameHandler = () => {
		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === mentorItem.middleCategory) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}
	};

	useEffect(() => {
		getCategoryNameHandler();
	}, []);

	return (
		<>
			<div className="mt-12 w-[14rem] bg-black-100 rounded-lg duration-100 hover:scale-105">
				<img
					src={mentorItem.uploadUrl}
					alt="멘토 이미지"
					className="w-full h-[15rem] rounded-t-lg object-contain"
				/>
				<div className="flex justify-center items-center mt-2 text-sm font-bold">
					{categoryName}
				</div>
				<div className="flex justify-center items-center mt-2">
					<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
						<Star width={20} height={20} className="mr-1" />
						<div className="font-semibold text-sm">
							{mentorItem.rating === null ? "0.0" : mentorItem.rating}
						</div>
					</div>
					<div className="ml-3 text-md font-semibold">
						{mentorItem.name} 멘토
					</div>
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: mentorItem.introduce }}
					className="w-[13rem] h-[3rem] mx-3 mt-2 mb-4 font-semibold title-overflow"
				/>
			</div>
		</>
	);
};

export default MentorItem;
