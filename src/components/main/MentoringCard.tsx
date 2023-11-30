import { ReactComponent as Calendar } from "@/assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@/assets/svg/cash.svg";
import { ReactComponent as Group } from "@/assets/svg/people.svg";
import { ReactComponent as Star } from "@/assets/svg/star.svg";
import { categories } from "@/constants/categories";
import { IMentoringCard } from "@/interface/mainPageMentoringCard";
import { useEffect, useState } from "react";

interface IProps {
	readonly mentoringCard: IMentoringCard;
}

interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

interface IReplaceDate {
	readonly replaceStartDate: string;
	readonly replaceEndDate: string;
}

const MentoringCard = ({ mentoringCard }: IProps) => {
	const [replaceAmountAndHeadCount, setReplaceAmountAndHeadCount] =
		useState<IReplaceAmountAndHeadCount>({
			replaceAmount: "",
			replaceHeadCount: "",
		});
	const [replaceDate, setReplaceDate] = useState<IReplaceDate>({
		replaceStartDate: "",
		replaceEndDate: "",
	});
	const [categoryName, setCategoryName] = useState<string>("");

	const replaceHandler = () => {
		const replaceAmount = mentoringCard.amount.toLocaleString();
		const replaceHeadCount = mentoringCard.amount.toLocaleString();

		const startDate = new Date(mentoringCard.startDate);
		const endDate = new Date(mentoringCard.endDate);

		const replaceStartDate = `${startDate.getFullYear()}년 ${
			startDate.getMonth() + 1
		}월 ${startDate.getDate()}일`;

		const replaceEndDate = `${endDate.getFullYear()}년 ${
			endDate.getMonth() + 1
		}월 ${endDate.getDate()}일`;

		setReplaceDate({
			replaceStartDate,
			replaceEndDate,
		});

		setReplaceAmountAndHeadCount({
			replaceAmount,
			replaceHeadCount,
		});

		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === mentoringCard.category) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}
	};

	useEffect(() => {
		replaceHandler();
	}, []);

	return (
		<div className="my-4 pb-4 w-[14rem] bg-white shadow-sm hover:shadow-lg border-b rounded-t-lg text-black-500 duration-100 hover:scale-105">
			<img
				src={mentoringCard.uploadUrl}
				alt="mentoringImage"
				className="relative w-[14rem] h-[15rem] rounded-lg object-cover z-20"
			/>
			<div className="flex bottom-4 mt-3 mx-4">
				<div className="flex items-center font-semibold text-[0.7rem]">
					<Star width={13} height={13} className="mr-1" />
					<div className="font-semibold text-sm">
						{mentoringCard.rating ? mentoringCard.rating : "0"}
					</div>
				</div>
				<div className="ml-2 text-[0.8rem] font-bold">
					{mentoringCard.name} 멘토님
				</div>
			</div>
			<div className="mx-4 mt-3">
				<div className="text-main-color text-[0.7rem] font-semibold">
					{categoryName}
				</div>
				<p className="w-[13rem] max-h-[3rem] text-[0.8rem] font-medium title-overflow">
					{mentoringCard.title}
				</p>
			</div>
			<div className="flex items-center mt-4 ml-3 font-medium text-[0.7rem]">
				<Calendar width={15} height={15} />
				<div>
					<div className="ml-1.5">
						{replaceDate.replaceStartDate}
						<span className="text-[0.65rem] text-black-400">부터</span>
					</div>
					<div className="ml-1.5">
						{replaceDate.replaceEndDate}
						<span className="text-[0.65rem] text-black-400">까지</span>
					</div>
				</div>
			</div>
			<div className="flex items-center mt-2 ml-3">
				<Cash width={15} height={15} />
				<div className="ml-1.5 font-medium text-[0.7rem]">
					{replaceAmountAndHeadCount.replaceAmount} ₩
				</div>
			</div>
			<div className="flex items-center mt-2 ml-3">
				<Group width={15} height={15} />
				<div className="ml-1.5 font-medium text-[0.7rem]">
					{replaceAmountAndHeadCount.replaceHeadCount} 명
				</div>
			</div>
		</div>
	);
};

export default MentoringCard;
