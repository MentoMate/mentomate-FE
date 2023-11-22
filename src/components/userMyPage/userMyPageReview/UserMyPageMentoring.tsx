import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { useEffect, useState } from "react";
import StarRating from "@/components/userMyPage/userMyPageReview/UserStarRating";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { IEndMentoringItem } from "@/interface/myPageEndMentoring";
import { Link } from "react-router-dom";
import { categories } from "@/constants/categories";

interface IProps {
	readonly mentoringItem: IEndMentoringItem;
}
interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

interface IReplaceDate {
	readonly replaceStartDate: string;
	readonly replaceEndDate: string;
}
const UserMyPageMentoring = ({ mentoringItem }: IProps) => {
	const [showModal, setShowModal] = useState(false);

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

	const ratingClickHandler = () => {
		setShowModal(true);
		lockScroll();
	};

	const closeModalHandler = () => {
		setShowModal(false);
		cancelLockScroll();
	};
	const replaceHandler = () => {
		const replaceAmount = mentoringItem.amount.toLocaleString();
		const replaceHeadCount = mentoringItem.amount.toLocaleString();

		const startDate = new Date(mentoringItem.startDate);
		const endDate = new Date(mentoringItem.endDate);

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
	};

	const getCategoryNameHandler = () => {
		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === mentoringItem.category) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}
	};

	useEffect(() => {
		replaceHandler();
		getCategoryNameHandler();
	}, []);

	return (
		<div className="mt-6 pb-4 w-[14rem] bg-white shadow-sm  border-b rounded-t-lg text-black-500  ">
			{showModal && (
				<StarRating show={showModal} onClose={closeModalHandler}></StarRating>
			)}

			<img
				src={mentoringItem.uploadUrl}
				alt="mentoringImage"
				className=" w-[14rem] h-[15rem] rounded-lg object-cover z-20"
			/>
			<div className="flex bottom-4 mt-3 mx-4">
				<div className="flex items-center font-semibold text-[0.7rem]">
					<Star width={13} height={13} className="mr-1" />
					{mentoringItem.grade === null ? "0.0" : mentoringItem.grade}
				</div>
				<div className="ml-2 text-[0.8rem] font-bold">
					{mentoringItem.name} 멘토님
				</div>
			</div>
			<div className="mx-4 mt-3">
				<div className="text-main-color text-[0.7rem] font-semibold">
					{categoryName}
				</div>
				<p className="w-[13rem] max-h-[3rem] text-[0.8rem] font-medium title-overflow">
					{mentoringItem.title}
				</p>
			</div>
			<div className="flex items-center mt-4 ml-3 font-medium text-[0.7rem]">
				<Calendar width={15} height={15} />
				<div>
					<div className="ml-1.5">
						{replaceDate.replaceStartDate}{" "}
						<span className="text-[0.65rem] text-black-400">부터</span>
					</div>
					<div className="ml-1.5">
						{replaceDate.replaceEndDate}{" "}
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
			<div className="flex justify-between mx-2">
				<button
					onClick={ratingClickHandler}
					className="w-[7rem] h-[2rem] mt-2 mr-2 mb-4 py-1 bg-main-color rounded-md font-bold text-white text-xs cursor-pointer "
				>
					평점
				</button>
				<Link
					to={"/communityRegistration"}
					className="flex justify-center items-center w-[7rem] h-[2rem] mt-2 mb-4 py-1 bg-red-500 rounded-md font-bold text-white text-center text-xs   "
				>
					후기
				</Link>
			</div>
		</div>
	);
};

export default UserMyPageMentoring;
