import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { communityLikeAndCommentCnt } from "@/state/followStats";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as CommentIcon } from "@assets/svg/comment.svg";
import { FormEvent, useRef } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

const CommentSubmit = () => {
	const isLogin = useRecoilValue(loginState);
	const { fetchDataUseAxios } = useAxios();
	const [comment, setComment] = useInput("");
	const { communityId } = useParams();
	const inputCommentRef = useRef<HTMLInputElement>(null);
	const [likeAndCommentCnt, setLikeAndCommentCnt] = useRecoilState(
		communityLikeAndCommentCnt,
	);
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const submitHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/${communityId}/comments`,
			data: {
				comment,
			},
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				setComment("");
				if (inputCommentRef.current) {
					inputCommentRef.current.value = "";
				}
				queryClient.invalidateQueries("communityComment");

				const commentsCnt = likeAndCommentCnt.commentCnt + 1;

				setLikeAndCommentCnt({
					...likeAndCommentCnt,
					commentCnt: commentsCnt,
				});
			}

			if (status === 400) {
				alertHandler("error", "잠시 후에 다시 시도해주세요.");
			}

			if (status === 401 || status === 403) {
				alertHandler("error", "재 로그인 후 사용해주세요.");
				navigate("/login");
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 이용해주세요.",
				);
				return;
			}
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
			className="flex items-center mb-8 py-2 border border-black-200 rounded-[0.3rem]"
			onSubmit={submitCommentHandler}
		>
			<CommentIcon className="ml-4 md:mr-2 w-[1.3rem] h-[1.3rem] fill-black-300" />
			<input
				ref={inputCommentRef}
				type="text"
				onChange={setComment}
				className="mx-auto lg:w-[45rem] md:w-[35rem] sm:w-[25rem] w-[10rem] disabled:bg-white outline-none placeholder:text-[0.8rem] md:text-base text-sm"
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
