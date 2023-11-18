import { Link, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import { openChatModalState } from "@/state/chatState";
import { useSetRecoilState } from "recoil";

const Button = ({ data }: IMentoringDetailProps) => {
	const params = useParams();
	const { fetchDataUseAxios } = useAxios();
	const setIsOpenChatList = useSetRecoilState(openChatModalState);

	const onClickFavoriteMentoringHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `mentoring/${params.mentoringId}`,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const createChat1On1Handler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: "/chat/room/private",
			data: {
				mentorId: data.userId,
				mentoringId: data.mentoringId,
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
			<Link
				className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold"
				to={`/payment/${params.mentoringId}`}
			>
				멘토링 신청
			</Link>
			<button
				type="button"
				className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold"
				onClick={createChat1On1Handler}
			>
				1:1 문의
			</button>
			<button
				onClick={() => onClickFavoriteMentoringHandler()}
				className="my-1 py-2 w-full bg-red-200 rounded-sm text-white text-lg font-bold"
			>
				멘토링 찜 하기
			</button>
		</div>
	);
};

export default Button;
