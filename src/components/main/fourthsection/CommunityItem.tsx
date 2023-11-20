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
	console.log(data);
	return (
		<Link
			to={`/communityDetail/${data.postId}`}
			className="my-4 px-3 py-6 md:w-[18rem] sm:w-[20rem] w-[18rem] border border-black-200 rounded-md duration-100 hover:scale-110 cursor-pointer"
		>
			<div className="object-cover h-[14rem]">
				<img
					src={data.uploadUrl}
					alt="썸네일"
					className="md:w-[18rem] sm:w-[20rem] w-[18rem] h-[14rem]"
				/>
			</div>
			<div className="flex justify-center items-center mt-6 text-black-400 text-sm text-center">
				{data.category === "review" && (
					<>
						<Review width={20} height={20} className="mr-1" />
						후기남겨요
					</>
				)}
			</div>
			<p className="mt-2 mb-4 text-lg font-bold community-overflow text-center">
				{data.title}
			</p>
			<div className="flex justify-center text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					{data.writer}
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />
					{data.postLikesCount}
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />
					{data.commentCount}
				</div>
			</div>
		</Link>
	);
};

export default CommunityItem;
