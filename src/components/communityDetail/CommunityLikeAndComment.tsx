import useAxios from "@/hooks/useAxios";
import { ICommunityItem } from "@/interface/community";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

interface IProps {
	readonly communityInfo: ICommunityItem;
}
console.log("asd");
const CommunityLikeAndComment = ({ communityInfo }: IProps) => {
	const queryClient = useQueryClient();
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

	const submitLikeHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/posts/${communityId}/postLikes`,
		});

		if (response) {
			if (response.status === 200) {
				queryClient.invalidateQueries("communityDetail");
			}

			if (response.status !== 200) {
				alertHandler("error", "잠시 후에 다시 시도해주세요.");
			}
		}
	};

	const submitLike = useMutation(() => submitLikeHandler());

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
			: submitLike.mutate();
	};

	return (
		<div className="flex mt-12 mb-8 py-2 border-b border-black-200 text-black-400">
			<div className="flex items-center">
				{communityInfo.like ? (
					<FillHeart
						width={23}
						height={23}
						onClick={onClickLikeHandler}
						className="cursor-pointer"
					/>
				) : (
					<EmptyHeart
						width={23}
						height={23}
						onClick={onClickLikeHandler}
						className="cursor-pointer"
					/>
				)}

				<div className="ml-1">좋아요</div>
				<div className="mx-1.5 font-bold">{communityInfo.postLikesCount}</div>
			</div>
			<div className="flex items-center ml-4">
				<Comment width={25} height={25} fill="#8A8A8A" className="mx-1" />
				<div>댓글</div>
				<div className="mx-1.5 font-bold">{communityInfo.commentCount}</div>
			</div>
		</div>
	);
};

export default CommunityLikeAndComment;
