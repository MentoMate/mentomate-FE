import useAxios from "@/hooks/useAxios";
import { mentorState } from "@/state/mentorState";
import { alertHandler } from "@/utils/alert";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

const MentoringEndButton = () => {
	const params = useParams();
	const mentorCheck = useRecoilValue(mentorState);
	const { fetchDataUseAxios } = useAxios();
	const onClickMentoringEndHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: `/mentoring/${params.id}`,
		});

		if (response) {
			if (response.status === 200) {
				alertHandler("success", "멘토링이 종료되었습니다");
			} else {
				alertHandler("error", response.data);
			}
		}
	};

	return (
		<>
			<button // 멘티인지 멘토인지에 대한 여부에 따라 멘토링 종료버튼 활성/비활성 수정
				role="button"
				className={`${
					mentorCheck
						? "hidden lg:flex items-center mx-1 bg-red-100 hover:bg-red-400 text-white py-2 px-4 rounded-[0.3rem] z-10 transition duration-200"
						: "hidden "
				}`}
				onClick={() => onClickMentoringEndHandler()}
				disabled={!mentorCheck}
			>
				멘토링 종료
			</button>
		</>
	);
};
export default MentoringEndButton;
