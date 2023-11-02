import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { alertHandler } from "@/utils/alert";
const PaymentConfirmation = () => {
	const navigate = useNavigate();
	const payData = {
		pg: "kakaopay.TC0ONETIME",
		pay_method: "card",
		merchant_uid: new Date().getTime(),
		name: "대기업 프로젝트 개발자와 함께하는 면접 트레이닝",
		amount: 1,
		buyer_email: "test@naver.com",
		buyer_name: "함창범",
		buyer_tel: "010-1234-5678",
		buyer_addr: "서울특별시",
		buyer_postcode: "123-456",
	};
	const [agreed, setAgreed] = useState(false);

	const mentoringName = "대기업 프로젝트 개발자와 함께하는 면접 트레이닝";
	const mentorName = "조인성";
	const mentoringDuration = "2022.10.18 ~ 2023.11.31";
	const paymentAmount = "59,900";

	const toggleAgreement = () => {
		setAgreed(!agreed);
	};
	useEffect(() => {
		const jquery = document.createElement("script");
		jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
		const iamport = document.createElement("script");
		iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
		document.head.appendChild(jquery);
		document.head.appendChild(iamport);

		return () => {
			document.head.removeChild(jquery);
			document.head.removeChild(iamport);
		};
	}, []);
	const requestPay = () => {
		const { IMP }: any = window;
		IMP.init("imp80622465");

		IMP.request_pay(
			payData,
			async (res: any) => {
				console.log(res);

				//try {
				//const { data } = await axios.post(
				//"{결제 검증 api 주소}/" + res.imp_uid,
				//);
				if (res.success) {
					//if (res.paid_amount === data.response.amount) { //결제 검증
					navigate("/paymentsuccess");
				} else {
					alertHandler("warning", "결제 실패.");
				}
			}, //catch (error) {
			//console.error("결제 검증 실패:", error);
			//alertHandler("warning", "결제 실패");
			//}
			//}
		);
	};
	return (
		<div className="flex items-center justify-center min-h-screen lg:h-[64.5rem] bg-gray-100">
			<div className="flex flex-col items-center justify-center bg-white p-12 shadow-md rounded-md   h-[40rem] md:h-[39rem] w-[17rem] md:w-[30rem] lg:w-[40rem]">
				<h2 className="text-xl font-semibold mb-10 lg:mb-20">결제 내용</h2>
				<div>
					<div className="mb-8">
						<p className="font-bold">멘토링 명</p>
						<p> {mentoringName}</p>
					</div>
					<div className="mb-8">
						<p className="font-bold ">멘토 </p>
						<p> {mentorName + " 멘토"}</p>
					</div>
					<div className="mb-8">
						<p className=" font-bold mb-2"> 멘토링 기간</p>
						<p className="flex items-center">
							<Calendar width={20} height={20} />
							<div className="text-xs lg:text-sm ml-2">{mentoringDuration}</div>
						</p>
					</div>
					<div className="mb-8">
						<p className="font-bold mb-2">결제 금액</p>
						<p className="flex">
							<Cash width={20} height={20} />
							<div className="text-xs lg:text-sm ml-2">
								{paymentAmount} {"₩"}
							</div>
						</p>
					</div>
					<label className="flex justify-center items-center">
						<input
							type="checkbox"
							checked={agreed}
							onChange={toggleAgreement}
							className="text-xs lg:text-sm mr-2"
						/>
						결제 내역을 확인하시고 결제에 동의하시겠습니까 ?
					</label>
				</div>

				<div className="flex flex-col  items-center  mt-4 ">
					<button
						onClick={requestPay}
						disabled={!agreed}
						className={`mt-4 py-2 px-4 rounded-md ${
							!agreed
								? "bg-gray-400 text-gray-700 cursor-not-allowed"
								: "bg-main-color text-white hover:bg-main-color"
						}`}
					>
						결제하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default PaymentConfirmation;
