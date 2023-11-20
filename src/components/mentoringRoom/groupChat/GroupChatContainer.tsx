import { groupChatHistory } from "@/data/groupChatHistory";
import { openGroupChatModalState } from "@/state/chatState";
import { ReactComponent as Logo } from "@assets/svg/Logo.svg";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { FormEvent, useRef } from "react";
import { getCookie } from "@/utils/cookies";
import { CompatClient } from "@stomp/stompjs";
import { MutableRefObject, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useInput from "@/hooks/useInput";
console.log("asd");
interface IProps {
	readonly client: MutableRefObject<CompatClient | undefined>;
}

const GroupChatContainer = ({ client }: IProps) => {
	const { id } = useParams();
	const [isOpenGroupChat, setIsOpenGroupChat] = useRecoilState(
		openGroupChatModalState,
	);
	const chats = useRecoilValue(groupChatHistory);
	const [message, setMessage] = useInput("");
	const messageInputRef = useRef<HTMLInputElement>(null);
	const [loginUserId, setLoginUserId] = useState<string>("");
	const chatRef = useRef<HTMLDivElement>(null);

	const onClickCloseChatHandler = () => {
		setIsOpenGroupChat(false);
	};

	const sendMessageHandler = async (e: FormEvent) => {
		e.preventDefault();
		const TOKEN = getCookie("accessToken");
		const loginUserId = localStorage.getItem("userId");

		if (client.current) {
			client.current.send(
				"/publish/chat/message/group",
				{
					Authorization: `Bearer ${TOKEN}`,
				},
				JSON.stringify({
					groupMentoringId: id,
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

	useEffect(() => {
		const userId = localStorage.getItem("userId");
		if (userId) {
			setLoginUserId(userId);
		}
	}, []);

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [chats]);

	return (
		<div
			className={`${
				isOpenGroupChat ? "flex flex-col" : "hidden"
			} absolute top-[-39rem] left-[-20rem] w-[23rem] h-[38rem] bg-black-100 border border-gray-100 rounded-3xl shadow-xl z-[99]`}
		>
			<div className="mt-2 flex justify-between items-center">
				<Logo width={130} height={70} className="ml-8" />
				<Close
					width={20}
					height={20}
					className="mr-8 cursor-pointer"
					onClick={onClickCloseChatHandler}
				/>
			</div>
			<div className="flex justify-center">
				<div
					ref={chatRef}
					className="bg-white w-[20rem] h-[28rem] rounded-md overflow-auto"
				>
					{chats.length === 0 ? (
						<p>아직 진행중인 채팅이 없습니다. </p>
					) : (
						chats.map((chat) => (
							<div
								className={`flex flex-col mt-2 ${
									String(chat.senderUserId) === loginUserId
										? "items-end mr-4"
										: "items-start ml-4"
								}`}
							>
								<div className="font-normal">
									{String(chat.senderUserId) !== loginUserId &&
										chat.senderNickName}
								</div>
								<div
									className={`my-2 px-2 py-1 w-[15rem] ${
										String(chat.senderUserId) === loginUserId
											? "bg-main-color"
											: "bg-green-200"
									} rounded-lg break-words`}
								>
									{chat.message}
								</div>
							</div>
						))
					)}
				</div>
			</div>
			<form onSubmit={sendMessageHandler} className="flex justify-center">
				<input
					ref={messageInputRef}
					type="text"
					className="mt-4 px-4 py-2 w-[20rem] bg-black-200 rounded-3xl outline-none placeholder:text-sm"
					placeholder="메세지를 입력하세요."
					onChange={setMessage}
				/>
			</form>
		</div>
	);
};

export default GroupChatContainer;
