import { CompatClient } from "@stomp/stompjs";
import { MutableRefObject } from "react";

export interface IChatList {
	readonly id: number;
	readonly privateChatRoomId: number;
	readonly senderNickName: string;
	readonly message: string;
	readonly registerDatetime: string;
}

export interface IChatInProps {
	readonly data: IChatList[];
}

export interface IClientProps {
	readonly client: MutableRefObject<CompatClient | undefined>;
}

export interface IChatAndClientProps {
	readonly client: MutableRefObject<CompatClient | undefined>;
	readonly data: IChatList[];
}
