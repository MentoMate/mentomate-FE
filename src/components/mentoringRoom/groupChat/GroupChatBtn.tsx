import { groupChatHistory } from "@/data/groupChatHistory";
import useAxios from "@/hooks/useAxios";
import { openGroupChatModalState } from "@/state/chatState";
import { getCookie } from "@/utils/cookies";
import { ReactComponent as ChatEmotion } from "@assets/svg/chatEmotion.svg";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import GroupChatContainer from "./GroupChatContainer";
console.log("asd");
const GroupChatBtn = () => {
	const { id } = useParams();
	const client = useRef<CompatClient>();
	const { fetchDataUseAxios } = useAxios();
	const setChats = useSetRecoilState(groupChatHistory);
	const [isOpenGroupChat, setIsOpenGroupChat] = useRecoilState(
		openGroupChatModalState,
	);

	const onClickChatEmotionHandler = () => {
		setIsOpenGroupChat(!isOpenGroupChat);
	};

	const setChatsHandler = (message: any) => {
		setChats((prev) => [
			...prev,
			{
				groupMentoringId: message.groupMentoringId,
				message: message.message,
				registerDatetime: message.registerDatetime,
				senderNickName: message.senderNickName,
				senderUserId: message.userId,
			},
		]);
	};

	const onConnected = (payload: any) => {
		const receiveMessage = JSON.parse(payload.body);
		setChatsHandler(receiveMessage);
	};

	const connect = async () => {
		const socket = new SockJS("http://43.202.208.73:8080/ws/chat");
		const stompClient = Stomp.over(socket);
		client.current = stompClient;
		const TOKEN = getCookie("accessToken");

		stompClient.connect(
			{
				Authorization: `Bearer ${TOKEN}`,
			},
			() => {
				stompClient.subscribe(`/topic/chat/room/${id}`, onConnected);
			},
		);

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/chat/room/${id}`,
		});

		if (response) {
			if (response.status === 200) {
				setChats(response.data);
			}
		}
	};

	const disconnect = () => {
		if (client.current) {
			client.current.deactivate();
		}
	};

	useEffect(() => {
		connect();

		return () => {
			disconnect();
		};
	}, []);

	return (
		<div>
			<button
				type="button"
				className="flex justify-center items-center w-16 h-16"
				onClick={onClickChatEmotionHandler}
			>
				<ChatEmotion className="w-full h-full" />
			</button>
			<GroupChatContainer client={client} />
		</div>
	);
};

export default GroupChatBtn;
