import useAxios from "@/hooks/useAxios";
import useInput from "@/hooks/useInput";
import { ICommentProps } from "@/interface/comment";
import { communityLikeAndCommentCnt } from "@/state/followStats";
import { alertHandler } from "@/utils/alert";
import { FormEvent, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

const IMAGE_SRC = "/src/assets/svg/user.svg";

const Comment = ({ comment }: ICommentProps) => {
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [editComment, setEditComment] = useInput(comment.comment);
	const navigate = useNavigate();
	const [likeAndCommentCnt, setLikeAndCommentCnt] = useRecoilState(
		communityLikeAndCommentCnt,
	);
	const queryClient = useQueryClient();

	const submitEditCommentHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: `/${communityId}/comments/${comment.id}`,
			data: {
				comment: editComment,
			},
		});

		if (response) {
			if (response.status === 200) {
				alertHandler("success", "댓글 수정이 되었습니다.");
				setIsEdit(false);
			}

			if (response.status !== 200) {
				alertHandler("error", "잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const deleteCommentHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `/${communityId}/comments/${comment.id}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				queryClient.invalidateQueries("communityComment");
				const deepCopyCommentsCnt = { ...likeAndCommentCnt };

				setLikeAndCommentCnt({
					...likeAndCommentCnt,
					commentCnt: deepCopyCommentsCnt.commentCnt - 1,
				});
				alertHandler("success", "댓글을 삭제하였습니다.");
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

	const editCommentBtnHandler = () => {
		setIsEdit(!isEdit);
	};

	const onClickDeleteBtnHandler = () => {
		Swal.fire({
			icon: "question",
			text: "댓글을 삭제 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteCommentHandler();
			}
		});
	};

	const editCompleteBtnHandler = (e: FormEvent) => {
		e.preventDefault();
		Swal.fire({
			icon: "question",
			text: "댓글을 수정 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				submitEditCommentHandler();
			}
		});
	};

	return (
		<div className="mt-8">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<div className="md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem] border border-black-200 rounded-full">
						<img
							src={
								comment.userUploadUrl === null
									? IMAGE_SRC
									: comment.userUploadUrl
							}
							alt=""
							className="w-full h-full rounded-full object-contain"
						/>
					</div>
					<div className="ml-4 font-semibold md:text-base text-[0.9rem]">
						{comment.nickName}
					</div>
				</div>
				<div
					className={`${
						comment.owner ? "block" : "hidden"
					} text-sm text-black-400`}
				>
					{isEdit ? (
						<>
							<button className="mx-1" onClick={editCompleteBtnHandler}>
								수정완료
							</button>
							<button className="mx-1" onClick={editCommentBtnHandler}>
								취소
							</button>
						</>
					) : (
						<>
							<button className="mx-1" onClick={editCommentBtnHandler}>
								수정
							</button>
							<button className="mx-1" onClick={onClickDeleteBtnHandler}>
								삭제
							</button>
						</>
					)}
				</div>
			</div>
			<div className="md:ml-14 ml-12">
				{isEdit ? (
					<form onSubmit={editCompleteBtnHandler}>
						<input
							type="text"
							defaultValue={editComment}
							onChange={setEditComment}
							className="px-2 py-1 w-full border rounded-md border-main-color outline-none text-sm"
						/>
					</form>
				) : (
					<p className="text-sm">{comment.comment}</p>
				)}
			</div>
		</div>
	);
};

export default Comment;
