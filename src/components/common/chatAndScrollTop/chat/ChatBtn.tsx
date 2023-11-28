import { chatHistory } from "@/data/chatHistory";
import useAxios from "@/hooks/useAxios";
import { openChatModalState, selectedPrivateChatId } from "@/state/chatState";
import { loginState } from "@/state/loginState";
import { getCookie } from "@/utils/cookies";
import { ReactComponent as ChatEmotion } from "@assets/svg/chatEmotion.svg";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import ChatModalContainer from "./ChatModalContainer";
import { useQuery } from "react-query";
import { checkAuthToken } from "@/utils/checkAuthToken";

const ChatBtn = () => {
	const isLogin = useRecoilValue(loginState);
	const privateChatRoomId = useRecoilValue(selectedPrivateChatId);
	const [isOpenChatList, setIsOpenChatList] =
		useRecoilState(openChatModalState);
	const setChats = useSetRecoilState(chatHistory);
	const client = useRef<CompatClient>();
	const { fetchDataUseAxios } = useAxios();

	const getChatList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/chat/room/private/chatList",
		});

		if (response) {
			if (response.status === 200) {
				return response.data;
			}
		}
	};

	const { data } = useQuery(["chatList"], getChatList);

	const onClickChatEmotionHandler = () => {
		setIsOpenChatList(!isOpenChatList);
	};

	const setChatsHandler = (message: any) => {
		setChats((prev) => [
			...prev,
			{
				privateChatRoomId: message.groupMentoringId,
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

	const connect = () => {
		const socket = new SockJS(`${import.meta.env.VITE_SERVER_URI}/ws/chat`);
		const stompClient = Stomp.over(socket);
		client.current = stompClient;

		checkAuthToken();

		const TOKEN = getCookie("accessToken");

		stompClient.connect(
			{
				Authorization: `Bearer ${TOKEN}`,
			},
			() => {
				stompClient.subscribe(
					`/subscribe/chat/room/${privateChatRoomId}`,
					onConnected,
				);
			},
		);
	};

	const disconnect = () => {
		if (client.current) {
			client.current.deactivate();
		}
	};

	useEffect(() => {
		if (isLogin && privateChatRoomId !== null) {
			connect();
		}

		return () => {
			disconnect();
		};
	}, [isLogin, privateChatRoomId]);

	return (
		<div className="relative my-1.5">
			<button
				type="button"
				className="flex justify-center items-center w-16 h-16"
				onClick={onClickChatEmotionHandler}
			>
				<ChatEmotion className="w-full h-full" />
			</button>
			<ChatModalContainer client={client} chatList={data} />
		</div>
	);
};

export default ChatBtn;
