import { IChatListHandlerProps } from "@/interface/chat";
import ExistChatList from "./ExistsChatList";
import NonExistsChatList from "./NonExistsChatList";

const ChatListContainer = ({
	chatList,
	onClickChatHandler,
}: IChatListHandlerProps) => {
	return (
		<div className="grow">
			<div
				className={`${
					chatList.length === 0 && "flex justify-center items-center"
				} mx-auto my-4 sm:w-[21rem] w-[15rem] h-[21rem] bg-white rounded-3xl shadow-sm overflow-auto`}
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
