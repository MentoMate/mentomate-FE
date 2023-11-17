import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { IMyCommunityItem } from "@/interface/myPageCommunity";

interface Iprops {
	communityItem: IMyCommunityItem;
}

const CommunityItem = ({ communityItem }: Iprops) => {
	return (
		<>
			<div className="object-cover h-[14rem]">
				<img
					src={communityItem.uploadUrl}
					alt="community_img"
					className="md:w-[18rem] sm:w-[20rem] w-[18rem] h-[14rem]"
				/>
			</div>
			<div className="flex justify-center items-center mt-6 text-black-400 text-sm text-center">
				소통해요
			</div>
			<p className="mt-2 mb-4 text-lg font-bold community-overflow text-center">
				{communityItem.title}
			</p>
			<div className="flex justify-center text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					{communityItem.writer}
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />
					{communityItem.postLikesCount}
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />
					{communityItem.commentCount}
				</div>
			</div>
		</>
	);
};

export default CommunityItem;
