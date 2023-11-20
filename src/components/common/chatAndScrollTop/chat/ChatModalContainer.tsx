import { IChatListClientProps } from "@/interface/chat";
import { openChatModalState, selectedPrivateChatId } from "@/state/chatState";
import { ReactComponent as Logo } from "@assets/svg/logoMainColor.svg";
import { ReactComponent as ChatComment } from "@assets/svg/chatComment.svg";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { ReactComponent as List } from "@assets/svg/list.svg";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import Chat1On1 from "./Chat1On1";
import ChatListContainer from "./chatList/ChatListContainer";
console.log("asd");
const ChatModalContainer = ({ client, chatList }: IChatListClientProps) => {
	const [privateChatRoomId, setPrivateChatId] = useRecoilState(
		selectedPrivateChatId,
	);
	const [isOpenChat, setIsOpenChat] = useRecoilState(openChatModalState);
	const [selectedChatMenu, setSelectedChatMenu] = useState<string>("list");
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const onClickChatHandler = (type: string, id: number) => {
		setSelectedChatMenu(type);
		setPrivateChatId(id);
	};

	const onClickMenuHandler = (type: string) => {
		if (privateChatRoomId === null) {
			return;
		}
		setSelectedChatMenu(type);
	};

	const onClickCloseChatHandler = () => {
		setIsOpenChat(false);
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				chatContainerRef.current &&
				!chatContainerRef.current.contains(e.target as Node)
			) {
				setIsOpenChat(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [chatContainerRef]);

	return (
		<div
			ref={chatContainerRef}
			className={`${
				isOpenChat ? "flex flex-col" : "hidden"
			} absolute top-[-30.5rem] sm:left-[-20rem] left-[-11.5rem] sm:w-[23rem] w-[17rem] h-[30rem] bg-black-100 border border-gray-100 rounded-3xl shadow-xl z-[102]`}
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
			{selectedChatMenu === "list" ? (
				<ChatListContainer
					onClickChatHandler={onClickChatHandler}
					chatList={chatList}
				/>
			) : (
				<Chat1On1 client={client} />
			)}
			<div className="flex justify-center py-4">
				<button
					type="button"
					onClick={() => onClickMenuHandler("list")}
					className={`flex flex-col justify-center items-center mx-6 ${
						selectedChatMenu === "list" && "text-blue-700"
					}`}
				>
					<List
						width={25}
						height={25}
						className={`mb-0.5 ${
							selectedChatMenu === "list" && "fill-blue-700"
						}`}
					/>
					목록
				</button>
				<button
					type="button"
					onClick={() => onClickMenuHandler("chat")}
					className={`flex flex-col justify-center items-center mx-6 ${
						selectedChatMenu === "chat" && "text-blue-700"
					}`}
				>
					<ChatComment
						width={25}
						height={25}
						className={`mb-0.5 ${
							selectedChatMenu === "chat" && "fill-blue-700"
						}`}
					/>
					대화
				</button>
			</div>
		</div>
	);
};

export default ChatModalContainer;
