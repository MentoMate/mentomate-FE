import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { IMentoringItem } from "@/interface/mentoringItem";
import { useState, useEffect } from "react";

interface IProps {
	readonly mentoringItem: IMentoringItem;
}

interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

const MentoringItem = ({ mentoringItem }: IProps) => {
	const [replaceAmountAndHeadCount, setReplaceAmountAndHeadCount] =
		useState<IReplaceAmountAndHeadCount>({
			replaceAmount: "",
			replaceHeadCount: "",
		});

	const replaceHandler = () => {
		const replaceAmount = mentoringItem.amount.toLocaleString();
		const replaceHeadCount = mentoringItem.amount.toLocaleString();

		setReplaceAmountAndHeadCount({
			replaceAmount,
			replaceHeadCount,
		});
	};

	useEffect(() => {
		replaceHandler();
	}, []);

	return (
		<div className="mt-12 pb-4 w-[14rem] border-b rounded-t-lg text-black-500 duration-100 hover:scale-105">
			<img
				src={mentoringItem.uploadUrl}
				alt="asd"
				className="w-full h-[15rem] rounded-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">
						{mentoringItem.rating === null ? "0.0" : mentoringItem.rating}
					</div>
				</div>
				<div className="ml-3 text-md font-medium">
					{mentoringItem.writer} 멘토님
				</div>
			</div>
			<p className="w-[13rem] h-[3.5rem] mx-3 mt-2 font-semibold title-overflow">
				{mentoringItem.title}
			</p>
			<div className="flex items-center mt-2 ml-3">
				<Calendar width={23} height={23} />
				<div className="ml-2 font-medium text-[0.8rem]">
					{mentoringItem.startDate} ~ {mentoringItem.endDate}
				</div>
			</div>
			<div className="flex items-center mt-1 ml-3">
				<Cash width={23} height={23} />
				<div className="ml-2 font-medium text-[0.8rem]">
					{replaceAmountAndHeadCount.replaceAmount} ₩
				</div>
			</div>
			<div className="flex items-center mt-1 ml-3">
				<Group width={23} height={23} />
				<div className="ml-2 font-medium text-[0.8rem]">
					{replaceAmountAndHeadCount.replaceHeadCount} 명
				</div>
			</div>
		</div>
	);
};

export default MentoringItem;
