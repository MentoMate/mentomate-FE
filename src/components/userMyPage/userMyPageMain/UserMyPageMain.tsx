import useAxios from "@/hooks/useAxios";
import UserMyPageMentoringList from "@/components/userMyPage/userMyPageMain/UserMyPageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface INickname {
	readonly email: string;
	readonly name: string;
	readonly nickname: string;
	readonly uploadUrl: string;
}
interface IProps {
	readonly content: string;
	readonly isRead: boolean;
	readonly notificationId: number;
	readonly notificationType: string;
	readonly registerDate: string;
}

const UserMyPageMain = () => {
	const [userInfo, setUserInfo] = useState<INickname>();
	const [notification, setNotification] = useState<IProps | null>();

	const { fetchDataUseAxios } = useAxios();

	const getUserInfoData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/user/info",
		});

		if (response && response.status === 200) {
			setUserInfo(response.data);
		}
	};

	const getMyNotificationData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "notification?page=0&size=1",
		});
		if (response && response.status === 200) {
			response.data.content[0];
			setNotification(response.data.content[0]);
		}
	};

	const getMyMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/mentoring/history?size=1&pageSize=3",
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(
		["myPageMentoringList", "/mentoring/history"],
		getMyMentoringData,
	);

	useEffect(() => {
		getMyNotificationData();
	}, [notification]);

	useEffect(() => {
		getUserInfoData();
	}, []);

	useEffect(() => {
		refetch();
	}, ["/mentoring/history", refetch]);

	return (
		<>
			<div className="flex items-center mb-12">
				<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full">
					<img
						src={userInfo && userInfo.uploadUrl}
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
				{notification !== undefined ? (
					<>
						{notification && (
							<div dangerouslySetInnerHTML={{ __html: notification.content }} />
						)}
					</>
				) : (
					<div className="flex flex-col justify-center items-center mb-6 min-h-[2rem] text-xl">
						알림 내역이 없습니다
					</div>
				)}
			</div>
			<div>
				<div className=" flex justify-between items-center mb-6 md:text-2xl text-xl font-bold mt-16">
					진행중인 멘토링
				</div>
				{data.content.length !== 0 ? (
					<>
						<UserMyPageMentoringList data={data.content} />
					</>
				) : (
					<div className="flex flex-col justify-center items-center mb-6 min-h-[20rem] text-xl">
						진행중인 멘토링이 없습니다
					</div>
				)}
			</div>
		</>
	);
};
export default UserMyPageMain;
