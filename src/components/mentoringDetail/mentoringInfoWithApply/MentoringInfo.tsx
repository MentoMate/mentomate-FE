import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { useState, useEffect } from "react";

interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

const MentoringInfo = ({ data }: IMentoringDetailProps) => {
	const [replaceAmountAndHeadCount, setReplaceAmountAndHeadCount] =
		useState<IReplaceAmountAndHeadCount>({
			replaceAmount: "",
			replaceHeadCount: "",
		});

	const replaceHandler = () => {
		const replaceAmount = data.amount.toLocaleString();
		const replaceHeadCount = data.numberOfPeople.toLocaleString();

		setReplaceAmountAndHeadCount({
			replaceAmount,
			replaceHeadCount,
		});
	};

	useEffect(() => {
		replaceHandler();
	}, []);

	return (
		<>
			<div className="lg:text-xl text-base font-bold">{data.title}</div>
			<div className="mt-4 lg:text-sm md:text-[0.7rem]">
				<div className="flex items-center mb-2">
					<Calendar width={20} height={20} className="mr-2" />
					{data.startDate} ~ {data.endDate}
				</div>
				<div className="flex items-center mb-2">
					<Cash width={20} height={20} className="mr-2" />
					{replaceAmountAndHeadCount.replaceAmount} ₩
				</div>
				<div className="flex items-center">
					<Group width={20} height={20} className="mr-2" />
					{replaceAmountAndHeadCount.replaceHeadCount}명
				</div>
			</div>
		</>
	);
};

export default MentoringInfo;
