import { IChatInProps } from "@/interface/chat";
import ExistChatList from "./ExistsChatList";
import NonExistsChatList from "./NonExistsChatList";

const ChatListContainer = ({ data }: IChatInProps) => {
	return (
		<div className="grow">
			<div
				className={`${
					data.length === 0 && "flex justify-center items-center"
				} mx-auto my-4 w-[21rem] min-h-[17rem] max-h-[27rem] bg-white rounded-3xl shadow-sm`}
			>
				{data.length === 0 ? <NonExistsChatList /> : <ExistChatList />}
			</div>
		</div>
	);
};

export default ChatListContainer;
