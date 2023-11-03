import { mentoringRegistrationData } from "@/data/mentoringRegistrationData";
import { selectedCategoryState } from "@/state/selectedCategory";
import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface IProps {
	readonly fileList: FileList | null;
}

const SaveAndBackButton = ({ fileList }: IProps) => {
	const registrationForm = useRecoilValue(mentoringRegistrationData);
	const category = useRecoilValue(selectedCategoryState);

	const submitHandler = async () => {
		const data = {
			title: registrationForm.title,
			// content: registrationForm.content,
			content: "asdasdasdsa",
			startDate: registrationForm.startDate,
			endDate: registrationForm.endDate,
			numberOfPeople: registrationForm.numberOfPeople,
			amount: registrationForm.amount,
			category: category.selectedCategory,
			status: "PROGRESS",
		};

		// const formData = new FormData();
		// formData.append("mentoringDto", JSON.stringify(data));
		// if (fileList !== null) {
		// 	formData.append("img", fileList[0]);
		// 	formData.append("img", fileList[0]);
		// 	formData.append("img", fileList[0]);
		// }
		// console.log(formData.getAll("img"));
		const asd = JSON.stringify(data);

		const token = getCookie("accessToken");
		const response = await axios.post("/api/mentoring", asd, {
			headers: {
				// "Content-Type": "multipart/form-data",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		console.log(response);
	};

	const onClickRegisterHandler = () => {
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
