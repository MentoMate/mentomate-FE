import useAxios from "@/hooks/useAxios";
import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import { openChatModalState, selectedPrivateChatId } from "@/state/chatState";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import { ReactComponent as Save } from "@assets/svg/fillSave.svg";
import { ReactComponent as NotSave } from "@assets/svg/emptySave.svg";

interface IReplaceAmountAndHeadCount {
	readonly replaceAmount: string;
	readonly replaceHeadCount: string;
}

interface IReplaceDate {
	readonly replaceStartDate: string;
	readonly replaceEndDate: string;
}

const MentoringInfo = ({ data }: IMentoringDetailProps) => {
	const navigate = useNavigate();
	const { mentoringId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const setIsOpenChatList = useSetRecoilState(openChatModalState);
	const setPrivateChatId = useSetRecoilState(selectedPrivateChatId);
	const isLogin = useRecoilValue(loginState);
	const [isLikeMentoring, setIsLikeMentoring] = useState<boolean>(
		data.mentoringLike,
	);
	const [replaceAmountAndHeadCount, setReplaceAmountAndHeadCount] =
		useState<IReplaceAmountAndHeadCount>({
			replaceAmount: "",
			replaceHeadCount: "",
		});
	const [replaceDate, setReplaceDate] = useState<IReplaceDate>({
		replaceStartDate: "",
		replaceEndDate: "",
	});
	const [isAvailableMentoringApply, setIsAvailableMentoringApply] =
		useState<boolean>(false);

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

	const onClickApplyBtnHandler = () => {
		if (!isLogin) {
			Swal.fire({
				icon: "question",
				text: "로그인 후 신청 가능합니다. 로그인을 하시겠습니까?",
				showCancelButton: true,
				confirmButtonText: "확인",
				cancelButtonText: "취소",
			}).then((result) => {
				sessionStorage.setItem(
					"previousLocation",
					`/mentoringDetail/${mentoringId}`,
				);
				if (result.isConfirmed) {
					navigate(`/login`);
				}
			});
		}

		if (isLogin && isAvailableMentoringApply) {
			Swal.fire({
				icon: "question",
				text: "멘토링을 신청 하시겠습니까?",
				showCancelButton: true,
				confirmButtonText: "확인",
				cancelButtonText: "취소",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate(`/payment/${mentoringId}`);
				}
			});
		}
	};

	const createChat1On1Handler = async () => {
		if (!isLogin) {
			Swal.fire({
				icon: "question",
				text: "로그인 이후 이용 가능합니다. 로그인을 하시겠습니까?",
				showCancelButton: true,
				confirmButtonText: "확인",
				cancelButtonText: "취소",
			}).then((result) => {
				if (result.isConfirmed) {
					sessionStorage.setItem(
						"previousLocation",
						`/mentoringDetail/${mentoringId}`,
					);
					navigate("/login");
				}
			});
		} else {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: "/chat/room/private",
				data: {
					mentorId: data.userId,
					mentoringId: data.mentoringId,
				},
			});

			if (response) {
				if (response.status === 200) {
					setPrivateChatId(response.data.privateChatRoomId);
					setIsOpenChatList(true);
				}

				if (response.status === 400) {
					if (!response.data.privateChatRoomId) {
						setIsOpenChatList(false);
						alertHandler("error", "본인과 1:1 채팅은 불가능합니다.");
					} else {
						setPrivateChatId(response.data.privateChatRoomId);
						setIsOpenChatList(true);
					}
				}
			}
		}
	};

	const onClickLikeMentoringHandler = async () => {
		if (!isLogin) {
			Swal.fire({
				icon: "question",
				text: "로그인 이후 이용 가능합니다. 로그인을 하시겠습니까?",
				showCancelButton: true,
				confirmButtonText: "확인",
				cancelButtonText: "취소",
			}).then((result) => {
				if (result.isConfirmed) {
					sessionStorage.setItem(
						"previousLocation",
						`/mentoringDetail/${mentoringId}`,
					);
					navigate("/login");
				}
			});
		} else {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `/mentoring/${mentoringId}`,
			});

			if (response) {
				const status = response.status;

				if (status === 200) {
					setIsLikeMentoring(!isLikeMentoring);
					return response.data;
				}

				if (status === 400) {
					alertHandler("error", "사용자 본인 멘토링은 찜할 수 없습니다.");
					return;
				}

				if (status === 500) {
					alertHandler(
						"error",
						"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
					);
					return;
				}
			}
		}
	};

	const isPayCheckUserInfo = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/pay/check/user?mentoringId=${mentoringId}`,
		});

		if (response) {
			const status = response.status;
			if (status === 200) {
				setIsAvailableMentoringApply(response.data);
			}

			if (status === 401 || status === 403) {
				alertHandler("error", "재 로그인 후 다시 시도해주세요.");
				return;
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				return;
			}
		}
	};

	useEffect(() => {
		replaceHandler();
	}, []);

	useEffect(() => {
		if (isLogin) {
			isPayCheckUserInfo();
		} else {
			setIsAvailableMentoringApply(false);
		}
	}, [isLogin]);

	return (
		<>
			<div className="lg:text-xl text-base font-bold break-words">
				{data.title}
			</div>
			<div className="mt-4 lg:text-[0.8rem] md:text-[0.7rem]">
				<div className="flex items-center mb-3">
					<Calendar width={20} height={20} className="mr-2" />
					<div>
						<div>
							{replaceDate.replaceStartDate}
							<span className="ml-1 text-[0.75rem] text-black-400">부터</span>
						</div>
						<div>
							{replaceDate.replaceEndDate}
							<span className="ml-1 text-[0.75rem] text-black-400">까지</span>
						</div>
					</div>
				</div>
				<div className="flex items-center mb-3">
					<Cash width={20} height={20} className="mr-2" />
					{replaceAmountAndHeadCount.replaceAmount} ₩
				</div>
				<div className="flex items-center">
					<Group width={20} height={20} className="mr-2" />
					{replaceAmountAndHeadCount.replaceHeadCount}명
				</div>
				<button
					type="button"
					disabled={!isAvailableMentoringApply}
					className="mt-8 my-1 py-3 w-full border bg-main-color disabled:bg-black-300 hover:bg-purple-100 rounded-md text-sm text-white font-semibold text-center transition-all duration-250"
					onClick={onClickApplyBtnHandler}
				>
					멘토링 신청
				</button>
				<button
					type="button"
					className="my-1 py-3 w-full bg-white border hover:bg-purple-100 border-main-color hover:border-white rounded-md text-sm text-main-color hover:text-white font-semibold text-center transition-all duration-250"
					onClick={createChat1On1Handler}
				>
					1:1 문의
				</button>
				<button
					onClick={() => onClickLikeMentoringHandler()}
					className="flex justify-center items-center my-1 py-2 w-full bg-white border hover:bg-purple-100 border-main-color hover:border-white rounded-md text-sm text-main-color hover:text-white font-semibold text-center transition-all duration-250"
				>
					{isLikeMentoring ? (
						<Save width={30} height={30} className="mr-2" />
					) : (
						<NotSave width={30} height={30} className="mr-2" />
					)}
					멘토링 찜 하기
				</button>
			</div>
		</>
	);
};

export default MentoringInfo;
