import useAxios from "@/hooks/useAxios";
import { IClientProps } from "@/interface/chat";
import { getCookie } from "@/utils/cookies";
import { useEffect, FormEvent } from "react";

const Chat1On1 = ({ client }: IClientProps) => {
	const { fetchDataUseAxios } = useAxios();

	const sendMessageHandler = (e: FormEvent) => {
		e.preventDefault();
		const TOKEN = getCookie("accessToken");

		if (client.current) {
			client.current.send(
				"/publish/chat/message/private",
				{
					Authorization: `Bearer ${TOKEN}`,
				},
				JSON.stringify({
					privateChatRoomId: 3,
					message: "Hello,?",
				}),
			);
		}
	};

	const getChatHistory = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/chat/room/private/3",
		});

		if (response) {
			if (response.status === 200) {
				console.log(response);
			}
		}
	};

	useEffect(() => {
		getChatHistory();
	}, []);

	return (
		<div className="grow">
			<div className="mt-4 mx-auto w-[21rem] h-[27rem] bg-white rounded-3xl shadow-sm">
				<div className="px-4 py-4 w-[21rem] h-[23rem] overflow-auto">
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
				</div>
				<form
					onSubmit={sendMessageHandler}
					className="flex justify-center items-center"
				>
					<input
						type="text"
						className="px-4 w-[20rem] h-[3rem] bg-black-200 outline-none border rounded-3xl placeholder:text-sm"
						placeholder="메시지를 입력하세요."
					/>
				</form>
			</div>
		</div>
	);
};

export default Chat1On1;
