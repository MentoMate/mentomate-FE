import useAxios from "@/hooks/useAxios";
import MentorItem from "@components/mypage/myPageFollow/MentorItem";
import { useEffect } from "react";

const MypageFollow = () => {
	const { fetchDataUseAxios } = useAxios();

	const getMentorFollowData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/mentoring/follow?page=1&pageSize=3",
		});
		if (response && response.status === 200) {
			console.log(response);
			console.log("성공");
		}
	};

	useEffect(() => {
		getMentorFollowData();
	}, []);
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-32">
			<MentorItem />
			<MentorItem />
			<MentorItem />
			<MentorItem />
			<MentorItem />
		</div>
	);
};

export default MypageFollow;
