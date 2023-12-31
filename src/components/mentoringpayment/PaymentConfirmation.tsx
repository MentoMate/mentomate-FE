import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

interface IReplaceDate {
	readonly replaceStartDate: string;
	readonly replaceEndDate: string;
}

const PaymentConfirmation = () => {
	const { mentoringId } = useParams();
	const navigate = useNavigate();
	const [agreed, setAgreed] = useState(false);
	const { fetchDataUseAxios } = useAxios();
	const [replaceAmountAndHeadCount, setReplaceAmountAndHeadCount] =
		useState<IReplaceAmountAndHeadCount>({
			replaceAmount: "",
			replaceHeadCount: "",
		});
	const [replaceDate, setReplaceDate] = useState<IReplaceDate>({
		replaceStartDate: "",
		replaceEndDate: "",
	});

	const getMentoringInfo = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url: `/mentoring/${mentoringId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 401 || status === 403) {
				alertHandler("error", "재 로그인 후 다시 이용해주세요.");
				navigate(`/mentoring/${mentoringId}`);
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				navigate(`/mentoringDetail/${mentoringId}`);
			}
		}
	};

	const { data } = useQuery(
		["mentoringInfoInPayment", mentoringId],
		getMentoringInfo,
	);

	const replaceHandler = () => {
		const replaceAmount = data.amount.toLocaleString();
		const replaceHeadCount = data.numberOfPeople.toLocaleString();

		const startDate = new Date(data.startDate);
		const endDate = new Date(data.endDate);

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

	const toggleAgreement = () => {
		setAgreed(!agreed);
	};

	const requestPay = () => {
		const payData = {
			pg: "kakaopay.TC0ONETIME",
			pay_method: "card",
			merchant_uid: new Date().getTime(),
			name: data.title,
			amount: data.amount,
			buyer_email: data.email,
			buyer_name: data.name,
			buyer_tel: "010-1234-5678",
			buyer_addr: "서울특별시",
			buyer_postcode: "123-456",
		};

		const { IMP }: any = window;

		IMP.init("imp24880013");

		IMP.request_pay(payData, async (res: any) => {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `/pay/complete?mentoring_id=${mentoringId}&imp_uid=${res.imp_uid}`,
			});

			if (response) {
				const status = response.status;

				if (status === 200) {
					if (res.paid_amount === response.data.response.amount) {
						navigate("/paymentSuccess");

						await fetchDataUseAxios("useTokenAxios", {
							method: "POST",
							url: "/publish/notification",
							data: {
								receiverEmail: data.email,
								content: `${data.title} 멘토링에 신청자가 생겼습니다.`,
								notificationType: "PAY",
							},
						});
					}
				}

				if (status === 401 || status === 403) {
					alertHandler("error", "재로그인 후 이용해주세요.");
					navigate("/mentor");
				}

				if (status === 500) {
					alertHandler(
						"error",
						"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
					);
					return;
				}
			}
		});
	};

	useEffect(() => {
		const queryDOM = document.createElement("script");
		queryDOM.src = "https://code.jquery.com/jquery-1.12.4.min.js";
		const iAmPortDOM = document.createElement("script");
		iAmPortDOM.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
		document.head.appendChild(queryDOM);
		document.head.appendChild(iAmPortDOM);

		return () => {
			document.head.removeChild(queryDOM);
			document.head.removeChild(iAmPortDOM);
		};
	}, []);

	useEffect(() => {
		if (data) {
			replaceHandler();
		}
	}, [data]);

	return (
		<div className="flex items-center justify-center py-8 min-h-min-height bg-gray-100">
			<div className="flex flex-col items-center justify-center p-12 w-[17rem] md:w-[30rem] lg:w-[40rem] h-[40rem] bg-white rounded-md shadow-md">
				<h2 className="text-xl font-semibold mb-10 lg:mb-12">결제 내용</h2>
				<div>
					<div className="mb-8">
						<p className="font-bold">멘토링 명</p>
						<p> {data.title}</p>
					</div>
					<div className="mb-8">
						<p className="font-bold ">멘토 </p>
						<p> {data.name} 멘토</p>
					</div>
					<div className="mb-8">
						<p className=" font-bold mb-2"> 멘토링 기간</p>
						<p className="flex items-center">
							<Calendar width={20} height={20} />
							<div className="text-xs lg:text-sm ml-2">
								{replaceDate.replaceStartDate} ~ {replaceDate.replaceEndDate}
							</div>
						</p>
					</div>
					<div className="mb-8">
						<p className="font-bold mb-2">결제 금액</p>
						<p className="flex">
							<Cash width={20} height={20} />
							<div className="text-xs lg:text-sm ml-2">
								{replaceAmountAndHeadCount.replaceAmount} ₩
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
