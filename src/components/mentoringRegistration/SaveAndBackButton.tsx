import { mentoringRegistrationForm } from "@/data/mentoringRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { selectedCategoryState } from "@/state/selectedCategory";
import { alertHandler } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

const SaveAndBackButton = () => {
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();

	const form = useRecoilValue(mentoringRegistrationForm);
	const category = useRecoilValue(selectedCategoryState);

	const submitHandler = async () => {
		const data = JSON.stringify({
			title: form.title,
			content: form.content,
			startDate: form.startDate,
			endDate: form.endDate,
			numberOfPeople: form.numberOfPeople,
			amount: form.amount,
			category: category.selectedCategory,
			status: "PROGRESS",
		});

		const formData = new FormData();
		formData.append("mentoringDto", data);
		if (form.thumbNailImg) {
			formData.append("thumbNailImg", form.thumbNailImg);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/mentoring",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		});

		if (response && response.status === 200) {
			alertHandler("success", "멘토링 등록이 완료되었습니다.");
			navigate(`/mentoringDetail/${response.data.mentoringId}`);
		}
	};

	const checkFormHandler = () => {
		if (form.thumbNailImg === null) {
			alertHandler("warning", "썸네일 이미지 등록은 필수입니다.");
			return false;
		}
		if (form.numberOfPeople === 0 || form.numberOfPeople === null) {
			alertHandler("warning", "인원수 입력은 필수입니다.");
			return false;
		}
		if (form.amount === 0 || form.amount === null) {
			alertHandler("warning", "금액 입력은 필수입니다.");
			return false;
		}
		if (category.selectedCategory === "all") {
			alertHandler("warning", "카테고리 선택은 필수입니다.");
			return false;
		}
		if (form.title === "" || form.title.length < 8) {
			alertHandler("warning", "제목은 8자 이상 필수 입력입니다.");
			return false;
		}
		if (form.content === "" || form.content.length < 20) {
			alertHandler("warning", "내용은 20자 이상 필수 입력입니다.");
			return false;
		}

		return true;
	};

	const onClickRegisterHandler = () => {
		console.log(form);
		console.log(category.selectedCategory);
		if (!checkFormHandler()) return;
		Swal.fire({
			icon: "question",
			text: "멘토링을 등록을 하시겠습니까?",
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
		<div className="sticky bottom-0 mx-auto w-full bg-white">
			<div className="flex justify-center py-8 border-t border-black-200">
				<button
					className="mx-4 px-6 py-4 bg-main-color rounded-md text-white font-bold"
					onClick={onClickRegisterHandler}
				>
					저장하기
				</button>
				<button className="mx-4 px-6 py-4 bg-white border border-black-200 rounded-md">
					돌아가기
				</button>
			</div>
		</div>
	);
};

export default SaveAndBackButton;
