import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ICommunityItem } from "@/interface/mainPageCommunity";

const CommunityItem = ({ item }: { item: ICommunityItem }) => {
	return (
		<div className="my-4 px-6 py-6 md:w-[16rem] sm:w-[13rem] w-[14rem] border border-black-200 rounded-md duration-100 hover:scale-110">
			<div className="text-black-300 text-sm">
				{item.category === "review" ? "후기남겨요" : "없음"}
			</div>
			<p className="mb-4 text-lg font-bold community-overflow">{item.title}</p>
			<p className="mb-6 text-sm text-black-400 title-overflow">
				{item.content}
			</p>
			<div className="flex text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					{item.writer}
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />{" "}
					{item.postLikesCount}
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />
					{item.commentCount}
				</div>
			</div>
		</div>
	);
};

export default CommunityItem;
