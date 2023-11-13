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
			<div className="mt-12 w-[14rem] border-b rounded-t-lg text-black-500 duration-100 hover:scale-105">
				<img
					src={mentorItem.uploadUrl}
					alt="멘토 이미지"
					className="w-full h-[15rem] rounded-lg object-cover"
				/>
				<div className="flex justify-center items-center mt-6 mb-4 text-[0.8rem] font-bold">
					{categoryName}
				</div>
				<div className="flex justify-center items-center my-4">
					<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
						<Star width={20} height={20} className="mr-1" />
						<div className="font-semibold text-sm">
							{mentorItem.rating === null ? "0.0" : mentorItem.rating}
						</div>
					</div>
					<p className="ml-3 text-md font-medium">
						{mentorItem.name} <span className="text-sm">멘토</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default MentorItem;
