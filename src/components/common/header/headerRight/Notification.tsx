import useAxios from "@/hooks/useAxios";
import { notification } from "@/state/notification";
import { ReactComponent as Alert } from "@assets/svg/alert.svg";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

interface INotification {
	readonly notificationId: number;
	readonly receiverEmail: string;
	readonly content: string;
	readonly isRead: boolean;
	readonly notificationType: null | string;
	readonly registerDate: string;
}

const Notification = () => {
	const queryClient = useQueryClient();
	const { fetchDataUseAxios } = useAxios();
	const receiveNotificationCnt = useRecoilValue(notification);
	const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false);
	const [isPopNotification, setIsPopNotification] = useState<boolean>(false);
	const [isInit, setIsInit] = useState<boolean>(true);
	const notificationContainerRef = useRef<HTMLDivElement>(null);

	const getNoReadNotifications = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/notification/unread",
		});

		if (response) {
			if (response.status === 200) {
				return response.data;
			}
		}
	};

	const { data, refetch } = useQuery(["notification"], getNoReadNotifications);

	const readNotificationHandler = async (notificationId: number) => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: `/read/notification?notificationId=${notificationId}`,
		});

		if (response) {
			if (response.status === 200) {
				queryClient.invalidateQueries("notification");
			}
		}
	};

	const readNotification = useMutation((notificationId: number) =>
		readNotificationHandler(notificationId),
	);

	const onClickReadNotificationHandler = (notificationId: number) => {
		readNotification.mutate(notificationId);
	};

	const popNotificationHandler = () => {
		setIsPopNotification(true);
		setTimeout(() => {
			setIsPopNotification(false);
		}, 4000);
	};

	useEffect(() => {
		if (receiveNotificationCnt !== 0 && !isInit) {
			refetch();
			popNotificationHandler();
		}

		if (isInit) {
			setIsInit(false);
		}
	}, [receiveNotificationCnt]);

	return (
		<>
			<div className="relative px-2 cursor-pointer">
				<div onClick={() => setIsOpenNotification(!isOpenNotification)}>
					<Alert
						width={25}
						className={`${
							isPopNotification && "animate-pulse after:animate-sonar"
						}`}
					/>
					<div
						className={`absolute top-[-0.6rem] right-0 w-6 h-6 bg-red-100 rounded-2xl text-center text-white text-sm ${
							isPopNotification && "animate-pulse after:animate-sonar"
						}`}
					>
						{data.length}
					</div>
				</div>
				<div
					ref={notificationContainerRef}
					className={`${isOpenNotification ? "block" : "hidden"} 
          ${data.length === 0 && "flex justify-center items-center"}
          absolute top-8 left-[-13rem] w-60 h-72 bg-white border border-black-200 shadow-md rounded-md font-normal overflow-auto`}
				>
					{data.length !== 0 ? (
						data.map((notification: INotification) => (
							<div
								key={notification.notificationId}
								className="flex items-center pl-4 py-2 hover:bg-main-color text-sm hover:text-white"
							>
								<p
									className="grow truncate"
									onClick={() => setIsOpenNotification(!isOpenNotification)}
								>
									{notification.content}
								</p>
								<button
									type="button"
									className="h-6"
									onClick={() =>
										onClickReadNotificationHandler(notification.notificationId)
									}
								>
									<Close
										width={10}
										height={10}
										className="mr-4"
										fill="#F60000"
									/>
								</button>
							</div>
						))
					) : (
						<p className="text-sm text-black-500">알림이 없습니다.</p>
					)}
				</div>
			</div>
			{isPopNotification && (
				<div className="flex justify-center items-center absolute top-8 left-[50rem] w-[20rem] h-[6rem] bg-white border border-black-200 rounded-2xl shadow-md animate-bounce">
					<p>멘토링 신청자가 생겼습니다. </p>
				</div>
			)}
		</>
	);
};

export default Notification;
