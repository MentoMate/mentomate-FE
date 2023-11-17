import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "@components/mypage/myPageReview/MypageMentoringList";
import { useEffect, useState } from "react";

const MypageReview = () => {
	const { fetchDataUseAxios } = useAxios();
	const [data, setData] = useState();

	const getMyReviewData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/mentoring/end",
		});
		if (response && response.status === 200) {
			console.log(response);
			setData(response.data);
		}
	};

	useEffect(() => {
		getMyReviewData();
	}, []);
	return (
		<>
			<MypageMentoringList data={data} />
		</>
	);
};
export default MypageReview;
