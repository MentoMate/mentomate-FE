import { loginState } from "@/state/loginState";
import ChatBtn from "./chat/ChatBtn";
import ScrollTopBtn from "./ScrollTopBtn";
import { useRecoilValue } from "recoil";

const ChatAndScrollContainer = () => {
	const isLogin = useRecoilValue(loginState);

	return (
		<div className="flex flex-col items-end sticky bottom-10 right-0 mb-12 xl:mr-40 mr-10">
			{isLogin && <ChatBtn />}
			<ScrollTopBtn />
		</div>
	);
};

export default ChatAndScrollContainer;
