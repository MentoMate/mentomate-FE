import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ICommunityList } from "@/interface/community";
import { Link } from "react-router-dom";

interface IProps {
	readonly communityItem: ICommunityList;
}

const CommunityItem = ({ communityItem }: IProps) => {
	return (
		<Link
			to={`/community/${communityItem.id}`}
			className="my-4 px-6 py-6 md:w-[25rem] sm:w-[20rem] w-[18rem] border border-black-200 rounded-md duration-100 hover:scale-110 cursor-pointer"
		>
			<div className="text-black-300 text-sm">{communityItem.category}</div>
			<p className="mb-4 text-lg font-bold community-overflow">
				{communityItem.title}
			</p>
			<div
				dangerouslySetInnerHTML={{ __html: communityItem.content }}
				className="mb-6 text-sm text-black-400 title-overflow"
			/>

			<div className="flex text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					홍길동
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />0
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />0
				</div>
			</div>
		</Link>
	);
};

export default CommunityItem;
