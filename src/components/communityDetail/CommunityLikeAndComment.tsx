import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";

const CommunityLikeAndComment = () => {
	return (
		<div className="flex mt-12 mb-8 py-2 border-b border-black-200 text-black-400">
			<div className="flex items-center">
				<EmptyHeart width={23} height={23} />
				<div className="ml-1">좋아요</div>
				<div className="mx-1.5 font-bold">0</div>
			</div>
			<div className="flex items-center ml-4">
				<Comment width={25} height={25} fill="#8A8A8A" className="mx-1" />
				<div>댓글</div>
				<div className="mx-1.5 font-bold">0</div>
			</div>
		</div>
	);
};

export default CommunityLikeAndComment;
