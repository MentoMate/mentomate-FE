const MypagePaymentCard = () => {
	return (
		<>
			<div className="mb-12">
				<div className="mb-8 text-main-color font-semibold">결제 완료</div>
				<div className="bg-black-100 w-[18rem] lg:w-[45rem] h-[12rem] rounded-md">
					<div className="flex justify-between px-4 pt-2">
						<span className="hidden lg:block"> 멘토링</span>
						<span> 대기업 프로젝트 개발자와 함께하는 면접 트레이닝 </span>
					</div>
					<div className="flex justify-between px-4 pt-2">
						<span className="hidden lg:block"> 멘토</span>
						<span> 조인성 멘토</span>
					</div>
					<div className="flex justify-between px-4 py-2  border-b-2  ">
						<span className="hidden lg:block"> 멘토링 일자</span>
						<span> 2022.10.18 ~ 2023.11.31 </span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 일자</span>
						<span className="font-bold"> 2022-10-11 12:20:30 </span>
					</div>
					<div className="flex justify-between px-4 pt-2  ">
						<span className="hidden lg:block font-bold"> 결제 금액</span>
						<span className="font-bold"> 59,900 ₩ </span>
					</div>
				</div>
			</div>
		</>
	);
};
export default MypagePaymentCard;
