import { IChatListClientProps } from "@/interface/chat";
import { openChatModalState, selectedPrivateChatId } from "@/state/chatState";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { ReactComponent as Logo } from "@assets/svg/logoMainColor.svg";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Chat1On1 from "./Chat1On1";
import ChatListContainer from "./chatList/ChatListContainer";
import { useQueryClient } from "react-query";

const ChatModalContainer = ({ client, chatList }: IChatListClientProps) => {
	const [privateChatId, setPrivateChatId] = useRecoilState(
		selectedPrivateChatId,
	);
	const [isOpenChat, setIsOpenChat] = useRecoilState(openChatModalState);
	const [selectedChatMenu, setSelectedChatMenu] = useState<string>("list");
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	const onClickChatHandler = (type: string, id: number) => {
		setSelectedChatMenu(type);
		setPrivateChatId(id);
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

	useEffect(() => {
		if (privateChatId !== null) {
			queryClient.invalidateQueries(["chatList"]);
			setSelectedChatMenu("chat");
		} else {
			setSelectedChatMenu("list");
		}
	}, [privateChatId]);

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
				<Chat1On1 client={client} setSelectedChatMenu={setSelectedChatMenu} />
			)}
		</div>
	);
};

export default ChatModalContainer;
