import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ICommunityProps } from "@/interface/community";
import useAxios from "@/hooks/useAxios";
import { useParams } from "react-router-dom";
import { alertHandler } from "@/utils/alert";

const CommunityLikeAndComment = ({ communityInfo }: ICommunityProps) => {
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();

	const onClickLikeHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/posts/${communityId}/postLikes`,
		});

		if (response && response.status !== 200) {
			alertHandler("error", "잠시 후에 다시 시도해주세요.");
		}
	};

	return (
		<div className="flex mt-12 mb-8 py-2 border-b border-black-200 text-black-400">
			<div className="flex items-center">
				<EmptyHeart
					width={23}
					height={23}
					onClick={onClickLikeHandler}
					className="cursor-pointer"
				/>
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
