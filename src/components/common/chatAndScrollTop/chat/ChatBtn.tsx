import { loginState } from "@/state/loginState";
import { openChatState } from "@/state/openChat";
import { ReactComponent as ChatEmotion } from "@assets/svg/chatEmotion.svg";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SockJS from "sockjs-client";
import ChatModalContainer from "./ChatModalContainer";
import { getCookie } from "@/utils/cookies";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";

const ChatBtn = () => {
	const isLogin = useRecoilValue(loginState);
	const [isOpenChatList, setIsOpenChatList] = useRecoilState(openChatState);
	const client = useRef<CompatClient>();
	const { fetchDataUseAxios } = useAxios();

	const onClickChatEmotionHandler = () => {
		setIsOpenChatList(!isOpenChatList);
	};

	const onConnected = (payload: any) => {
		console.log(payload.body);
	};

	const connect = () => {
		const socket = new SockJS("http://43.202.208.73:8080/ws/chat");
		const stompClient = Stomp.over(socket);
		client.current = stompClient;
		const TOKEN = getCookie("accessToken");

		stompClient.connect(
			{
				Authorization: `Bearer ${TOKEN}`,
			},
			() => {
				stompClient.subscribe("/subscribe/chat/room/3", onConnected);
			},
		);
	};

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

	useEffect(() => {
		if (isLogin) {
			connect();
		}
	}, [isLogin]);

	return (
		<div className="relative my-1.5">
			<button
				type="button"
				className="flex justify-center items-center w-20 h-20"
				onClick={onClickChatEmotionHandler}
			>
				<ChatEmotion className="w-full h-full" />
			</button>
			<ChatModalContainer client={client} data={data} />
		</div>
	);
};

export default ChatBtn;
