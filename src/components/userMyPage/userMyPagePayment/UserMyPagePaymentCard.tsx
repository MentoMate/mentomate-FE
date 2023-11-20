import { IMyPaymentItem } from "@/interface/myPagePayment";

interface IProps {
	readonly payItem: IMyPaymentItem;
}
const UserMyPagePaymentCard = ({ payItem }: IProps) => {
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
							{payItem.mentoringStartDate} ~ {payItem.mentoringEndDate}{" "}
						</span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 일자</span>
						<span className="font-bold">{payItem.paymentDate} </span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 금액</span>
						<span className="font-bold">{payItem.amount} ₩ </span>
					</div>
				</div>
			</div>
		</>
	);
};
export default UserMyPagePaymentCard;
