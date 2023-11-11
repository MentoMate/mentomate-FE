import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as CommentIcon } from "@assets/svg/comment.svg";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

const CommentSubmit = () => {
	const isLogin = useRecoilValue(loginState);
	const [comment, setComment] = useInput("");
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();

	const submitHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/${communityId}/comments`,
			data: {
				comment,
			},
		});

		if (response && response.status === 200) {
			alertHandler("success", "댓글 등록이 되었습니다.");
		}
	};

	const submitCommentHandler = async (e: FormEvent) => {
		e.preventDefault();

		if (comment.length === 0) return;

		Swal.fire({
			icon: "question",
			text: "댓글을 등록을 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				submitHandler();
			}
		});
	};

	return (
		<form
			className="flex items-center mb-8 py-3 border border-black-200 rounded-md"
			onSubmit={submitCommentHandler}
		>
			<CommentIcon className="ml-4 md:mr-2 md:w-[2rem] sm:w-[1.5rem] md:h-[2rem] sm:h-[1.5rem] w-[1.3rem] h-[1.3rem] fill-black-300" />
			<input
				type="text"
				onChange={setComment}
				className="mx-auto lg:w-[45rem] md:w-[35rem] sm:w-[25rem] w-[10rem] outline-none md:placeholder:text-base sm:placeholder:text-sm placeholder:text-[0.8rem] md:text-base text-sm"
				disabled={isLogin ? false : true}
				placeholder={
					isLogin
						? "여러분의 댓글을 남겨주세요 :)"
						: "로그인 후 댓글을 남길 수 있습니다."
				}
			/>
		</form>
	);
};

export default CommentSubmit;
