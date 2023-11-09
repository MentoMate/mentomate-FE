import { mentoringEditForm } from "@/data/mentoringEditForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import Loading from "../common/spinner/Loading";

const EditSaveAndBackButton = () => {
	const { isLoading, fetchDataUseAxios } = useAxios();
	const { mentoringId } = useParams();
	const navigate = useNavigate();
	const form = useRecoilValue(mentoringEditForm);

	const submit = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			url: `/mentoring/${mentoringId}`,
			method: "PUT",
			data: form,
		});

		if (response && response.status === 200) {
			alertHandler("success", "멘토링 등록이 완료 되었습니다.");
			navigate(`/mentoringDetail/${mentoringId}`);
		}
	};

	const onClickSubmitHandler = () => {
		Swal.fire({
			icon: "question",
			text: "멘토링 등록을 하시겠습니까?",
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
