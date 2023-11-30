import { IMyPaymentItem } from "@/interface/myPagePayment";
import { useState, useEffect } from "react";

interface IProps {
	readonly payItem: IMyPaymentItem;
}
interface IReplace {
	readonly replaceAmount: string;
	readonly replacePaymentDate: string;
	readonly replaceStartDate: string;
	readonly replaceEndDate: string;
}

const UserMyPagePaymentCard = ({ payItem }: IProps) => {
	const [replaceValue, setReplaceValue] = useState<IReplace>({
		replaceAmount: "",
		replacePaymentDate: "",
		replaceStartDate: "",
		replaceEndDate: "",
	});

	const replaceHandler = () => {
		const replaceAmount = payItem.amount.toLocaleString();

		const startDate = new Date(payItem.mentoringStartDate);
		const endDate = new Date(payItem.mentoringEndDate);
		const paymentDate = new Date(payItem.paymentDate);

		const replaceStartDate = `${startDate.getFullYear()}년 ${
			startDate.getMonth() + 1
		}월 ${startDate.getDate()}일`;

		const replaceEndDate = `${endDate.getFullYear()}년 ${
			endDate.getMonth() + 1
		}월 ${endDate.getDate()}일`;

		const replacePaymentDate = `${paymentDate.getFullYear()}년 ${
			endDate.getMonth() + 1
		}월 ${endDate.getDate()}일`;

		setReplaceValue({
			replaceStartDate,
			replaceEndDate,
			replaceAmount,
			replacePaymentDate,
		});
	};

	useEffect(() => {
		replaceHandler();
	}, []);

	return (
		<>
			<div className="mb-12">
				<div className="mb-8 text-main-color font-semibold">
					{payItem.payStatus === "COMPLETE" ? "결제 완료" : "결제 실패"}
				</div>
				<div className="bg-black-100 w-[18rem] lg:w-[45rem] h-[12rem] rounded-md">
					<div className="flex justify-between px-4 pt-2">
						<span className="hidden lg:block"> 멘토링</span>
						<span> {payItem.mentoringTitle} </span>
					</div>
					<div className="flex justify-between px-4 pt-2">
						<span className="hidden lg:block"> 멘토</span>
						<span> {payItem.mentorNickname} 멘토</span>
					</div>
					<div className="flex justify-between px-4 py-2  border-b-2  ">
						<span className="hidden lg:block"> 멘토링 일자</span>
						<span>
							{" "}
							{replaceValue.replaceStartDate} ~ {replaceValue.replaceEndDate}
						</span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 일자</span>
						<span className="font-bold">
							{replaceValue.replacePaymentDate}{" "}
						</span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 금액</span>
						<span className="font-bold">{replaceValue.replaceAmount} ₩ </span>
					</div>
				</div>
			</div>
		</>
	);
};
export default UserMyPagePaymentCard;
