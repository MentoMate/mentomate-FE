import { IChatListHandlerProps } from "@/interface/chat";
console.log("asd");
const ExistChatList = ({
	chatList,
	onClickChatHandler,
}: IChatListHandlerProps) => {
	return (
		<div className="flex justify-center">
			{chatList.map((chat) => (
				<div
					key={chat.registerDatetime + String(chat.privateChatRoomId)}
					className="my-4 px-4 py-2 sm:w-[19rem] w-[15rem] bg-white hover:bg-black-200 rounded-lg transition-all duration-200 cursor-pointer"
					onClick={() => onClickChatHandler("chat", chat.privateChatRoomId)}
				>
					<div className="w-[19rem] font-semibold">{chat.chatPartner}</div>
					<div className="w-[19rem] text-black-300 font-light truncate">
						{chat.message}
					</div>
				</div>
			))}
		</div>
	);
};

export default ExistChatList;
