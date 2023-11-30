import { CompatClient } from "@stomp/stompjs";
import { MutableRefObject } from "react";

interface IChatList {
	readonly chatPartner: string;
	readonly id: number;
	readonly message: string;
	readonly privateChatRoomId: number;
	readonly registerDatetime: string;
	readonly senderNickName: string;
}

export interface IChatListClientProps {
	readonly client: MutableRefObject<CompatClient | undefined>;
	readonly chatList: IChatList[];
}

export interface IChatListHandlerProps {
	readonly chatList: IChatList[];
	readonly onClickChatHandler: (type: string, privateRoomId: number) => void;
}

export interface IClientProps {
	readonly client: MutableRefObject<CompatClient | undefined>;
	readonly setSelectedChatMenu: (type: string) => void;
}
