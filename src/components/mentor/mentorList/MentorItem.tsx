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
			<div className="mt-12 py-4 w-[14rem] bg-white border border-black-100 shadow-sm hover:shadow-lg border-b rounded-t-lg text-black-500 duration-100 hover:scale-105">
				<img
					src={mentorItem.uploadUrl}
					alt="멘토 이미지"
					className="mx-auto w-[8rem] h-[8rem] rounded-full object-cover"
				/>
				<div className="flex justify-center items-center mt-6 mb-1 text-[0.8rem] font-semibold text-main-color">
					{categoryName}
				</div>
				<div className="flex justify-center items-center">
					<div className="flex justify-center items-center px-2 py-1">
						<Star width={13} height={13} className="mr-1" />
						<div className="font-semibold text-[0.8rem]">
							{mentorItem.rating === null ? "0.0" : mentorItem.rating}
						</div>
					</div>
					<p className="ml-3 text-md font-medium">
						{mentorItem.name}
						<span className="text-[0.8rem] text-black-400">멘토</span>
					</p>
				</div>
			</div>
		</>
	);
};

export default MentorItem;
