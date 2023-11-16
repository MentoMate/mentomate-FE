import useAxios from "@/hooks/useAxios";
import { openChatState } from "@/state/openChat";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const Button = () => {
	const { fetchDataUseAxios } = useAxios();
	const setIsOpenChatList = useSetRecoilState(openChatState);

	const createChat1On1Handler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/chat/room/private",
			data: {
				mentorId: 2,
				mentoringId: 15,
			},
		});

		if (response) {
			if (response.status === 200) {
				setIsOpenChatList(true);
			}

			if (response.status === 400) {
				setIsOpenChatList(true);
			}
		}
	};

	return (
		<div className="flex flex-col mt-2">
			<Link to={"/payment"}>
				<button className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold">
					멘토링 신청
				</button>
			</Link>
			<button
				type="button"
				className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold"
				onClick={createChat1On1Handler}
			>
				1:1 문의
			</button>
		</div>
	);
};

export default Button;
