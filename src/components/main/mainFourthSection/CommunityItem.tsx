import { ICommunityItem } from "@/interface/mainPageCommunity";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";

import { Link } from "react-router-dom";

interface IProps {
	readonly data: ICommunityItem;
}

const CommunityItem = ({ data }: IProps) => {
	return (
		<Link
			to={`/communityDetail/${data.postId}`}
			className="my-4 py-6 w-[18.5rem] bg-white border-b border-black-200 rounded-md shadow-sm hover:shadow-lg duration-100 hover:scale-105 cursor-pointer"
		>
			<img
				src={data.uploadUrl}
				alt="썸네일"
				className="w-[18.5rem] h-[10rem] object-cover rounded-lg"
			/>
			<div className="flex justify-center items-center mt-6 text-black-400 text-[0.7rem] text-center">
				{data.category === "review" && (
					<>
						<Review width={15} height={15} className="mr-1" />
						후기남겨요
					</>
				)}
			</div>
			<p className="mt-2 mx-3 mb-2 font-bold break-word text-sm text-center">
				{data.title}
			</p>
			<div className="flex justify-center items-center text-[0.8rem]">
				<User width={15} height={15} className="mr-1 rounded-full" />
				{data.writer}
			</div>
			<div className="flex justify-center mt-4 text-black-400 font-semibold">
				<div className="flex justify-center items-center mx-1 text-[0.8rem]">
					<FillHeart width={15} height={15} className="mx-1" />
					{data.postLikesCount}
				</div>
				<div className="flex justify-center items-center mx-1 text-[0.8rem]">
					<Comment width={15} height={15} className="mx-1" />
					{data.commentCount}
				</div>
			</div>
		</Link>
	);
};

export default CommunityItem;
