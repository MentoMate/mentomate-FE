import useAxios from "@/hooks/useAxios";
import { useEffect } from "react";

const MypageAlarm = () => {
	const { fetchDataUseAxios } = useAxios();

	const scheduleReadHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/notification?page=1&pageSize=3",
		});
		if (response && response.status === 200) {
			console.log(response);
			console.log("성공");
		}
	};

	useEffect(() => {
		scheduleReadHandler();
	}, []);
	return (
		<>
			<div className="h-[3rem] mb-12 border-b-2">
				OOO님이 멘토링을 결제 하였습니다
			</div>
			<div className="h-[3rem] mb-12 border-b-2">
				OOO님이 멘토링을 결제 하였습니다
			</div>
			<div className="h-[3rem] mb-12 border-b-2">
				OOO님이 멘토링을 결제 하였습니다
			</div>
			<div className="h-[3rem] mb-12 border-b-2">
				OOO님이 멘토링을 결제 하였습니다
			</div>
		</>
	);
};
export default MypageAlarm;
