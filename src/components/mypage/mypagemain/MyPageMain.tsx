import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "@components/mypage/myPageMain/MypageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface INickname {
	readonly email: string;
	readonly name: string;
	readonly nickname: string;
}
interface Iprops {
	readonly content: string;
	readonly isRead: boolean;
	readonly notificationId: number;
	readonly notificationType: string;
	readonly registerDate: string;
}

const MypageMain = () => {
	const [userInfo, setUserInfo] = useState<INickname>();
	const [notification, setNotification] = useState<Iprops>();

	const { fetchDataUseAxios } = useAxios();
	const getUserInfoData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/user/info",
		});

		if (response && response.status === 200) {
			console.log(response.data);
			setUserInfo(response.data);
		}
	};
	const getMyNotificationData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "notification?page=0&size=1",
		});
		if (response && response.status === 200) {
			console.log(response.data.content[0]);
			setNotification(response.data.content[0]);
		}
	};

	const getMyMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/mentoring/history",
		});
		if (response && response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	};
	const { data } = useQuery(
		["mypageMentoringList", "/mentoring/history"],
		getMyMentoringData,
	);

	useEffect(() => {
		getMyMentoringData();
		getUserInfoData();
		getMyNotificationData();
	}, []);
	return (
		<>
			<div className="flex items-center mb-12">
				<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full">
					<img
						src="src/assets/image/sample.jpg"
						alt="sample"
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center ml-6">
					<div className="lg:text-base md:text-sm text-black-400">이름</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						{userInfo && userInfo.name}
					</div>
					<div className="lg:text-base md:text-sm text-black-400">이메일</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						{userInfo && userInfo.email}
					</div>
				</div>
			</div>
			<div>
				<div className=" flex justify-between items-center mb-6 md:text-2xl text-xl font-bold">
					최근 알림
				</div>
				{notification && (
					<div dangerouslySetInnerHTML={{ __html: notification.content }} />
				)}
			</div>
			<div>
				<div className=" flex justify-between items-center mb-6 md:text-2xl text-xl font-bold mt-16">
					진행중인 멘토링
				</div>

				<MypageMentoringList data={data.content} />
			</div>
		</>
	);
};
export default MypageMain;
