import { loginState } from "@/state/loginState";
import ChatBtn from "./chat/ChatBtn";
import ScrollTopBtn from "./ScrollTopBtn";
import { useRecoilValue } from "recoil";
console.log("asd");
const ChatAndScrollContainer = () => {
	const isLogin = useRecoilValue(loginState);

	return (
		<div className="flex flex-col items-end fixed bottom-5 right-0 mb-4 xl:mr-40 mr-10 z-[45]">
			{isLogin && <ChatBtn />}
			<ScrollTopBtn />
		</div>
	);
};

export default ChatAndScrollContainer;
