import { alertHandler } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useAxios from "@/hooks/useAxios";
import { scheduleRegistrationForm } from "@/data/scheduleRegistrationForm";
import Swal from "sweetalert2";
const ScheduleAddButton = ({ reactQuillRef }: { reactQuillRef: any }) => {
	const { isLoading, fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();
	const form = useRecoilValue(scheduleRegistrationForm);

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
		console.log(form);
		const data = {
			title: form.title,
			content: form.content,
			startDate: form.startDate,
			mentoringId: "1",
			uploadImg: imageArr,
			uploadFolder: form.uploadFolder,
		};

		const formData = new FormData();
		formData.append(
			"scheduleSave",
			new Blob([JSON.stringify(data)], { type: "application/json" }),
		);

		console.log(formData.get("scheduleSave"));

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/mentoring/schedule",
			data: formData,
		});

		if (response && response.status === 200) {
			alertHandler("success", "일정 등록이 완료되었습니다.");
		}
	};

	const checkFormHandler = () => {
		if (form.title === null) {
			alertHandler("warning", "제목은 필수입니다.");
			return false;
		}
		if (form.content === "" || form.content.length < 20) {
			alertHandler("warning", "내용은 20자 이상 필수 입력입니다.");
			return false;
		}

		return true;
	};

	const onClickRegisterHandler = () => {
		if (!checkFormHandler()) return;
		Swal.fire({
			icon: "question",
			text: "일정을 등록을 하시겠습니까?",
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
		<>
			<button
				className="h-[3rem] lg:h-[5rem] w-[15rem] lg:w-[55rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg"
				onClick={onClickRegisterHandler}
			>
				추가하기
			</button>
		</>
	);
};
export default ScheduleAddButton;
