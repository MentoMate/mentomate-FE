import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "@/components/mypage/myPageFavoriteMentoring/MypageMentoringList";
import { useEffect } from "react";

const MypageFavoriteMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const getFavoriteMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "mentoring/follow",
		});
		if (response && response.status === 200) {
			console.log(response);
			console.log("성공");
		}
	};

	useEffect(() => {
		getFavoriteMentoringData();
	}, []);

	return (
		<div className="mb-12">
			<MypageMentoringList />
		</div>
	);
};
export default MypageFavoriteMentoring;
