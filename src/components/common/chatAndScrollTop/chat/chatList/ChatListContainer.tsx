import { IChatListHandlerProps } from "@/interface/chat";
import ExistChatList from "./ExistsChatList";
import NonExistsChatList from "./NonExistsChatList";
console.log("asd");
const ChatListContainer = ({
	chatList,
	onClickChatHandler,
}: IChatListHandlerProps) => {
	return (
		<div className="grow">
			<div
				className={`${
					chatList.length === 0 && "flex justify-center items-center"
				} mx-auto my-4 sm:w-[21rem] w-[15rem] min-h-[17rem] max-h-[27rem] bg-white rounded-3xl shadow-sm`}
			>
				{chatList.length === 0 ? (
					<NonExistsChatList />
				) : (
					<ExistChatList
						chatList={chatList}
						onClickChatHandler={onClickChatHandler}
					/>
				)}
			</div>
		</div>
	);
};

export default ChatListContainer;
