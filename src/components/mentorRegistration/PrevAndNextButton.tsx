import { mentorRegistrationForm } from "@/data/mentorRegistrationData";
import { useFetch } from "@/hooks/useFetch";
import { registrationStep } from "@/state/mentorRegistrationStep";
import { selectedCategoryState } from "@/state/selectedCategory";
import { alertHandler } from "@/utils/alert";
import { getCookie } from "@/utils/cookies";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

const PrevAndNextButton = () => {
	const selectedCategoryType = useRecoilValue(selectedCategoryState);
	const [step, setStep] = useRecoilState(registrationStep);
	const mentorRegistraionFormData = useRecoilValue(mentorRegistrationForm);
	const { fetchCall } = useFetch();
	const navigate = useNavigate();

	const onClickbuttonHandler = (type: string) => {
		let iconType = "";
		let msg = "";

		if (type === "next") {
			if (step === 1 && selectedCategoryType.selectedCategoryType === "all") {
				iconType = "warning";
				msg = "큰 카테고리를 선택해주세요 !";
				alertHandler(iconType, msg);
				return;
			} else if (step === 2 && selectedCategoryType.selectedCategory === "") {
				iconType = "warning";
				msg = "작은 카테고리를 선택해주세요 !";
				alertHandler(iconType, msg);
				return;
			}
		}

		if (type === "prev") {
			setStep(step - 1);
		} else if (type === "next") {
			setStep(step + 1);
		}
	};

	const submit = async () => {
		const token = getCookie("accessToken");
		const sumCareer =
			mentorRegistraionFormData.careerYear * 12 +
			mentorRegistraionFormData.careerMonth;

		const response = await fetchCall("/api/user/profile", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-type": "application/json",
			},
			body: JSON.stringify({
				name: mentorRegistraionFormData.name,
				career: sumCareer,
				introduce: mentorRegistraionFormData.introduceContent,
				mainCategory: selectedCategoryType.selectedCategoryType,
				middleCategory: selectedCategoryType.selectedCategory,
			}),
		});

		if (response && response.status === 200) {
			alertHandler("success", "멘토등록이 완료되었습니다.");
			navigate("/mentor");
		}

		if (response && response.status === 500) {
			alertHandler(
				"warning",
				"서버 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
			);
			return;
		}
	};

	const onClickRegisterHandler = async () => {
		if (
			mentorRegistraionFormData.name === "" ||
			mentorRegistraionFormData.introduceContent === "" ||
			(mentorRegistraionFormData.careerYear === 0 &&
				mentorRegistraionFormData.careerMonth === 0)
		) {
			alertHandler("error", "필수정보를 입력해주세요.");
			return;
		}

		Swal.fire({
			icon: "question",
			text: "멘토 등록을 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				submit();
			}
		});
	};

	return (
		<div className="flex justify-center fixed bottom-0 w-full py-4 bg-white border-t">
			<button
				type="button"
				className="mx-2 px-8 py-4 bg-black-300 rounded-sm font-semibold text-lg text-white cursor-pointer"
				onClick={() => onClickbuttonHandler("prev")}
				disabled={step === 1 ? true : false}
			>
				이전
			</button>
			{step === 3 ? (
				<button
					type="button"
					className="mx-2 px-8 py-4 bg-main-color rounded-sm font-semibold text-lg text-white"
					onClick={onClickRegisterHandler}
				>
					멘토등록
				</button>
			) : (
				<button
					type="button"
					className="mx-2 px-8 py-4 bg-main-color rounded-sm font-semibold text-lg text-white"
					onClick={() => onClickbuttonHandler("next")}
				>
					다음
				</button>
			)}
		</div>
	);
};

export default PrevAndNextButton;
