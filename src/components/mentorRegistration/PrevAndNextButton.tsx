import useAlert from "@/hooks/useAlert";
import { registrationStep } from "@/state/mentorRegistrationStep";
import { selectedCategoryState } from "@/state/selectedCategory";
import { useRecoilState, useRecoilValue } from "recoil";

const PrevAndNextButton = () => {
	const [step, setStep] = useRecoilState(registrationStep);
	const selectedCategoryType = useRecoilValue(selectedCategoryState);
	const { alertHandler } = useAlert();

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
