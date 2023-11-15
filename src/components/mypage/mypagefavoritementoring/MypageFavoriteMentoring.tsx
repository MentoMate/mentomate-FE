import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "./MypageMentoringList";

const MypageFavoriteMentoring = () => {
	const scheduleReadHandler = async () => {
		const { fetchDataUseAxios } = useAxios();
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "mentoring/follow",
		});
		if (response && response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	};

	return (
		<div className="mb-12">
			<MypageMentoringList />
		</div>
	);
};
export default MypageFavoriteMentoring;
