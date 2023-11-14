import { ICommunityItem } from "@/interface/mainPageCommunity";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as User } from "@assets/svg/user.svg";

interface IProps {
	readonly data: ICommunityItem;
}

const CommunityItem = ({ data }: IProps) => {
	return (
		<div className="my-4 px-6 py-6 md:w-[16rem] sm:w-[13rem] w-[14rem] border border-black-200 rounded-md duration-100 hover:scale-110">
			<div className="text-black-300 text-sm">
				{data.category === "review" ? "후기남겨요" : "없음"}
			</div>
			<p className="mb-4 text-lg font-bold community-overflow">{data.title}</p>
			<p className="mb-6 text-sm text-black-400 title-overflow">
				{data.content}
			</p>
			<div className="flex text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					{data.writer}
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />{" "}
					{data.postLikesCount}
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />
					{data.commentCount}
				</div>
			</div>
		</div>
	);
};

export default CommunityItem;
