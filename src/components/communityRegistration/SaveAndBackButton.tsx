import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import Loading from "../common/spinner/Loading";

const SaveAndBackButton = () => {
	const { isLoading, fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();

	const form = useRecoilValue(communityRegistrationForm);

	// TODO: 게시글 등록 API 수정되면 코드 붙일 예정
	const submitHandler = async () => {
		const data = {
			category: form.category,
			title: form.title,
			content: form.content,
			upload: `/post/`,
			uploadImg: [],
		};

		const formData = new FormData();
		formData.append(
			"mentoringDto",
			new Blob([JSON.stringify(data)], { type: "application/json" }),
		);
		if (form.thumbNailImg) {
			formData.append("thumbNailImg", form.thumbNailImg);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/mentoring",
			data: formData,
		});

		if (response && response.status === 200) {
			alertHandler("success", "게시글 등록이 완료되었습니다.");
			navigate(`/communityDetail/${response.data.id}`);
		}
	};

	const checkFormHandler = () => {};

	const onClickRegisterHandler = () => {
		// if (!checkFormHandler()) return;
		Swal.fire({
			icon: "question",
			text: "게시글을 등록을 하시겠습니까?",
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
			{isLoading && <Loading />}
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
		</>
	);
};

export default SaveAndBackButton;
