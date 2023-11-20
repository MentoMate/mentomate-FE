import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useParams } from "react-router-dom";

const MentoringEndButton = () => {
	const params = useParams();

	const { fetchDataUseAxios } = useAxios();
	const onClickMentoringEndHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: `/mentoring/${params.id}`,
		});

		if (response) {
			if (response.status === 200) {
				console.log(response);
			} else {
				alertHandler("error", response.data);
			}
		}
	};

	return (
		<>
			<div
				role="button"
				className="hidden lg:flex items-center mx-1 bg-red-100 hover:bg-red-400 text-white py-2 px-4 rounded-[0.3rem] z-10 transition duration-200"
				onClick={() => onClickMentoringEndHandler()}
			>
				멘토링 종료
			</div>
		</>
	);
};
export default MentoringEndButton;
