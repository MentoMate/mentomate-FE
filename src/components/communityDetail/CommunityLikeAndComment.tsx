import useAxios from "@/hooks/useAxios";
import { ICommunityItem } from "@/interface/community";
import { communityLike, communityLikeAndCommentCnt } from "@/state/followStats";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface IProps {
	readonly communityInfo: ICommunityItem;
}

const CommunityLikeAndComment = ({ communityInfo }: IProps) => {
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();
	const [isLike, setIsLike] = useRecoilState(communityLike);
	const [likeAndCommentCnt, setLikeAndCommentCnt] = useRecoilState(
		communityLikeAndCommentCnt,
	);

	const submitLikeHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/posts/${communityId}/postLikes`,
		});

		if (response) {
			if (response.status === 200) {
				setIsLike(!isLike);

				if (!isLike === true) {
					setLikeAndCommentCnt({
						...likeAndCommentCnt,
						postLikeCnt: likeAndCommentCnt.postLikeCnt + 1,
					});
				} else {
					setLikeAndCommentCnt({
						...likeAndCommentCnt,
						postLikeCnt: likeAndCommentCnt.postLikeCnt - 1,
					});
				}
			}

			if (response.status !== 200) {
				alertHandler("error", "잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const onClickLikeHandler = async () => {
		!isLogin
			? Swal.fire({
					icon: "question",
					text: "로그인 이후 이용 가능합니다. 로그인 하시겠습니까?",
					showCancelButton: true,
					confirmButtonText: "확인",
					cancelButtonText: "취소",
			  }).then((result) => {
					if (result.isConfirmed) {
						sessionStorage.setItem(
							"previousLocation",
							`/communityDetail/${communityId}`,
						);
						navigate("/login");
					}
			  })
			: submitLikeHandler();
	};

	return (
		<div className="flex mt-12 mb-8 py-2 border-b border-black-200 text-black-400">
			<div className="flex items-center ml-2">
				<div className="text-sm">조회</div>
				<div className="mx-1 text-sm font-bold">{communityInfo.countWatch}</div>
			</div>
			<div className="flex items-center mx-2">
				{isLike ? (
					<FillHeart
						width={16}
						height={16}
						onClick={onClickLikeHandler}
						className="cursor-pointer"
					/>
				) : (
					<EmptyHeart
						width={16}
						height={16}
						onClick={onClickLikeHandler}
						fill="#8A8A8A"
						className="cursor-pointer"
					/>
				)}

				<div className="ml-1 text-sm">좋아요</div>
				<div className="mx-1.5 text-sm font-bold">
					{likeAndCommentCnt.postLikeCnt}
				</div>
			</div>
			<div className="flex items-center">
				<Comment width={16} height={16} fill="#8A8A8A" className="mx-1" />
				<div className="text-sm">댓글</div>
				<div className="mx-1.5 text-sm font-bold">
					{likeAndCommentCnt.commentCnt}
				</div>
			</div>
		</div>
	);
};

export default CommunityLikeAndComment;
