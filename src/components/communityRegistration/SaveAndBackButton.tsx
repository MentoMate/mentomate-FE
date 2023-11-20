import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import Loading from "../common/spinner/Loading";

interface IProps {
	readonly reactQuillRef: any;
}

const SaveAndBackButton = ({ reactQuillRef }: IProps) => {
	const { isLoading, fetchDataUseAxios } = useAxios();
	const form = useRecoilValue(communityRegistrationForm);
	const navigate = useNavigate();

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

		const data = {
			category: form.category,
			title: form.title,
			content: form.content,
			uploadFolder: `community/${form.uploadFolder}`,
			uploadImg: imageArr,
		};

		const formData = new FormData();
		formData.append(
			"postRegisterRequest",
			new Blob([JSON.stringify(data)], { type: "application/json" }),
		);
		if (form.thumbNailImg) {
			formData.append("thumbNailImg", form.thumbNailImg);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/posts",
			data: formData,
		});

		if (response && response.status === 200) {
			alertHandler("success", "게시글 등록이 완료되었습니다.");
			navigate(`/communityDetail/${response.data.id}`);
		}
	};

	const checkFormHandler = () => {
		if (form.thumbNailImg === null) {
			alertHandler("warning", "썸네일 이미지 등록은 필수입니다.");
			return false;
		}

		if (form.category === "") {
			alertHandler("warning", "커뮤니티 메뉴 선택은 필수 입니다.");
			return false;
		}

		if (form.title.length < 8) {
			alertHandler("warning", "게시글 제목은 8자 이상 필수 입력입니다.");
			return false;
		}

		if (form.content.length < 20) {
			alertHandler("warning", "게시글 내용은 20자 이상 필수 입력입니다.");
			return false;
		}

		return true;
	};

	const onClickRegisterHandler = () => {
		if (!checkFormHandler()) return;
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
