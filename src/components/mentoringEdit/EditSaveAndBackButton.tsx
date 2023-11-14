import { mentoringEditForm } from "@/data/mentoringEditForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import Loading from "../common/spinner/Loading";
import { selectedCategoryState } from "@/state/selectedCategory";

// TODO: reactQuill type 찾기
interface IProps {
	readonly reactQuillRef: any;
}

const EditSaveAndBackButton = ({ reactQuillRef }: IProps) => {
	const { isLoading, fetchDataUseAxios } = useAxios();
	const { mentoringId } = useParams();
	const navigate = useNavigate();
	const [form, setForm] = useRecoilState(mentoringEditForm);
	const setCategory = useSetRecoilState(selectedCategoryState);

	const submit = async () => {
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
			mentoringId: form.mentoringId,
			title: form.title,
			content: form.content,
			startDate: form.startDate,
			endDate: form.endDate,
			numberOfPeople: form.numberOfPeople,
			amount: form.amount,
			category: form.category,
			uploadFolder: form.uploadFolder,
			uploadImg: imageArr,
		};

		console.log(data);

		const formData = new FormData();
		formData.append(
			"mentoringSave",
			new Blob([JSON.stringify(data)], { type: "application/json" }),
		);
		if (form.thumbNailImg) {
			formData.append("thumbNailImg", form.thumbNailImg);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: "/mentoring",
			data: formData,
		});

		if (response && response.status === 200) {
			setForm({
				mentoringId: 0,
				title: "",
				content: "",
				startDate: new Date(),
				endDate: new Date(),
				numberOfPeople: 0,
				amount: 0,
				category: "all",
				thumbNailImgUrl: "",
				thumbNailImg: null,
				uploadFolder: "",
			});
			setCategory({
				selectedCategoryType: "all",
				selectedCategory: "all",
				selectedCategoryName: "카테고리 전체",
			});
			alertHandler("success", "멘토링 수정이 완료 되었습니다.");
			navigate(`/mentoringDetail/${mentoringId}`);
		}
	};

	const onClickSubmitHandler = () => {
		Swal.fire({
			icon: "question",
			text: "멘토링 수정을 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				submit();
			}
		});
	};

	const onClickBackBtnHandler = () => {
		Swal.fire({
			icon: "question",
			title: "정말 돌아가시겠습니까?",
			text: `확인을 누르시면 입력한 내용을 저장되지 않습니다.`,
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				navigate(`/mentoringDetail/${mentoringId}`);
			}
		});
	};

	return (
		<>
			<div className="fixed bottom-0 mx-auto w-full bg-white">
				<div className="flex justify-center py-4 border-t border-black-200">
					<button
						className="mx-4 px-6 py-4 bg-main-color rounded-md text-white font-bold"
						onClick={onClickSubmitHandler}
					>
						저장하기
					</button>
					<button
						className="mx-4 px-6 py-4 bg-white border border-black-200 rounded-md"
						onClick={onClickBackBtnHandler}
					>
						돌아가기
					</button>
				</div>
			</div>
			{isLoading && <Loading />}
		</>
	);
};

export default EditSaveAndBackButton;
