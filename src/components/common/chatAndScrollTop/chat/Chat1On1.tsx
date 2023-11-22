import { chatHistory } from "@/data/chatHistory";
import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { IClientProps } from "@/interface/chat";
import { selectedPrivateChatId } from "@/state/chatState";
import { getCookie } from "@/utils/cookies";
import { ReactComponent as ExitChat } from "@assets/svg/leftArrow.svg";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

const Chat1On1 = ({ client, setSelectedChatMenu }: IClientProps) => {
	const { fetchDataUseAxios } = useAxios();
	const [privateChatRoomId, setPrivateChatRoomId] = useRecoilState(
		selectedPrivateChatId,
	);
	const [message, setMessage] = useInput("");
	const chatRef = useRef<HTMLDivElement>(null);
	const messageInputRef = useRef<HTMLInputElement>(null);
	const [chats, setChats] = useRecoilState(chatHistory);
	const [loginUserId, setLoginUserId] = useState<string>("");

	const getChatHistory = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/chat/room/private/${privateChatRoomId}`,
		});

		if (response) {
			if (response.status === 200) {
				setChats(response.data);
			}
		}
	};

	const sendMessageHandler = async (e: FormEvent) => {
		e.preventDefault();
		const TOKEN = getCookie("accessToken");
		if (client.current) {
			client.current.send(
				"/publish/chat/message/private",
				{
					Authorization: `Bearer ${TOKEN}`,
				},
				JSON.stringify({
					privateChatRoomId: 15,
					userId: loginUserId,
					message: message,
				}),
			);
			if (messageInputRef.current) {
				messageInputRef.current.value = "";
				setMessage("");
			}
		}
	};

	const exitChatBtnHandler = () => {
		setPrivateChatRoomId(null);
		setSelectedChatMenu("list");
	};

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chats]);

	useEffect(() => {
		const userId = localStorage.getItem("userId");

		if (userId) {
			setLoginUserId(userId);
		}
	}, []);

	useEffect(() => {
		getChatHistory();
	}, []);

	return (
		<div className="grow">
			<button type="button" className="sticky top-0 ml-4">
				<ExitChat
					width={20}
					height={20}
					onClick={exitChatBtnHandler}
					className="fill-black-400 hover:fill-main-color duration-200 transition"
				/>
			</button>
			<div className="mt-1 mx-auto w-[21rem] h-[21rem] bg-white rounded-3xl shadow-sm">
				<div
					ref={chatRef}
					className="px-4 py-4 w-[21rem] h-[17rem] overflow-auto"
				>
					{chats.map((chat) => (
						<div
							key={chat.registerDatetime}
							className={`flex ${
								String(chat.senderUserId) === loginUserId
									? "justify-end"
									: "justify-start"
							}`}
						>
							<p
								className={`my-2 px-2 py-1 w-[15rem] ${
									String(chat.senderUserId) === loginUserId
										? "bg-main-color"
										: "bg-green-200"
								} rounded-lg break-words`}
							>
								{chat.message}
							</p>
						</div>
					))}
				</div>
				<form
					onSubmit={sendMessageHandler}
					className="flex justify-center items-center"
				>
					<input
						ref={messageInputRef}
						type="text"
						className="px-4 w-[20rem] h-[3rem] bg-black-200 outline-none border rounded-3xl placeholder:text-sm"
						placeholder="메시지를 입력하세요."
						onChange={setMessage}
					/>
				</form>
			</div>
		</div>
	);
};

export default Chat1On1;
