import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { alertHandler } from "@/utils/alert";
import axios from "axios";
import useAxios from "@/hooks/useAxios";

const mentoringName = "대기업 프로젝트 개발자와 함께하는 면접 트레이닝";
const mentorName = "조인성";
const mentoringDuration = "2022.10.18 ~ 2023.11.31";
const paymentAmount = "59,900";
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

const PaymentConfirmation = () => {
	const { paymentId } = useParams();
	const navigate = useNavigate();
	const [agreed, setAgreed] = useState(false);
	const { isLoading, fetchDataUseAxios } = useAxios();
	console.log(paymentId);

	const toggleAgreement = () => {
		setAgreed(!agreed);
	};

	const requestPay = () => {
		const { IMP }: any = window;
		IMP.init("imp24880013");

		IMP.request_pay(payData, async (res: any) => {
			console.log(res);

			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `/pay/complete?mentoring_id=${paymentId}&imp_uid=${res.imp_uid}`,
			});

			if (response && response.status === 200) {
				navigate("./paymentSuccess");
				return response.data;
			}
		});
	};

	useEffect(() => {
		const JQUERY = document.createElement("script");
		JQUERY.src = "http://code.jquery.com/jquery-1.12.4.min.js";
		const IAMPORT = document.createElement("script");
		IAMPORT.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
		document.head.appendChild(JQUERY);
		document.head.appendChild(IAMPORT);

		return () => {
			document.head.removeChild(JQUERY);
			document.head.removeChild(IAMPORT);
		};
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen lg:h-[64.5rem] bg-gray-100">
			<div className="flex flex-col items-center justify-center p-12 w-[17rem] md:w-[30rem] lg:w-[40rem] h-[40rem] md:h-[39rem] bg-white rounded-md shadow-md">
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
