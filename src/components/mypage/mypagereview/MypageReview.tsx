import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "@components/mypage/myPageReview/MypageMentoringList";
import { useQuery } from "react-query";

const MypageReview = () => {
	const { fetchDataUseAxios } = useAxios();

	const { data } = useQuery("myPageReview", async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/mentoring/end",
		});
		if (response && response.status === 200) {
			return response.data;
		}
	});
	console.log(data);
	return (
		<>
			<MypageMentoringList data={data.content} />
		</>
	);
};
export default MypageReview;
