import { mentorRegistrationForm } from "@/data/mentorRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { registrationStep } from "@/state/mentorRegistrationStep";
import { selectedCategoryState } from "@/state/selectedCategory";
import { alertHandler } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface IProps {
	readonly reactQuillRef: any;
}

const PrevAndNextButton = ({ reactQuillRef }: IProps) => {
	const selectedCategoryType = useRecoilValue(selectedCategoryState);
	const [step, setStep] = useRecoilState(registrationStep);
	const form = useRecoilValue(mentorRegistrationForm);
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();

	const onClickPrevNextBtnHandler = (type: string) => {
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

	const submitHandler = async () => {
		const imageArr = new Array();

		if (
			reactQuillRef.current !== null &&
			reactQuillRef.current.editor !== undefined
		) {
			const textEditorContent = reactQuillRef.current.editor.editor.delta.ops;

			for (let element of textEditorContent) {
				if (element.insert.image !== undefined) {
					imageArr.push(element.insert.image);
				}
			}
		}

		const sumCareer = form.careerYear * 12 + form.careerMonth;

		const data = {
			name: form.name,
			career: sumCareer,
			introduce: form.introduceContent,
			mainCategory: selectedCategoryType.selectedCategoryType,
			middleCategory: selectedCategoryType.selectedCategory,
			uploadFolder: form.uploadFolder,
			uploadImg: imageArr,
		};

		const formData = new FormData();
		formData.append(
			"userProfileSave",
			new Blob([JSON.stringify(data)], { type: "application/json" }),
		);

		if (form.img) {
			formData.append("img", form.img);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/user/profile",
			data: formData,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				alertHandler("success", "멘토등록이 완료되었습니다.");
				navigate("/mentor");
			}

			if (status === 400) {
				alertHandler("error", "필수 정보를 입력해주세요.");
				return;
			}

			if (status === 401 || status === 403) {
				alertHandler("error", "재 로그인 후 이용해주세요.");
				return;
			}

			if (status === 500) {
				alertHandler(
					"warning",
					"서버 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				return;
			}
		}
	};

	const onClickRegisterHandler = async () => {
		if (
			form.name === "" ||
			form.introduceContent === "" ||
			form.img === null ||
			(form.careerYear === 0 && form.careerMonth === 0)
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
				submitHandler();
			}
		});
	};

	return (
		<div className="flex justify-center fixed bottom-0 w-full py-4 bg-white border-t">
			<button
				type="button"
				className="mx-2 px-8 py-4 bg-black-300 rounded-sm font-semibold text-lg text-white cursor-pointer"
				onClick={() => onClickPrevNextBtnHandler("prev")}
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
					onClick={() => onClickPrevNextBtnHandler("next")}
				>
					다음
				</button>
			)}
		</div>
	);
};

export default PrevAndNextButton;
