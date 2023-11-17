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
				className="absolute top-0 right-10 bg-red-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg hidden lg:flex "
				onClick={() => onClickMentoringEndHandler()}
			>
				멘토링 종료
			</div>
		</>
	);
};
export default MentoringEndButton;
