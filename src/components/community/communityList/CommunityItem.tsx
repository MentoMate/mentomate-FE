import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ICommunityList } from "@/interface/community";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface IProps {
	readonly communityItem: ICommunityList;
}

const CommunityItem = ({ communityItem }: IProps) => {
	const [communityType, setCommunityType] = useState<string>("");

	useEffect(() => {
		if (communityItem.category === "community") {
			setCommunityType("소통해요");
		}

		if (communityItem.category === "promotion") {
			setCommunityType("홍보해요");
		}

		if (communityItem.category === "preview") {
			setCommunityType("후기남겨요");
		}
	}, []);

	return (
		<Link
			to={`/communityDetail/${communityItem.id}`}
			className="my-4 px-6 py-6 md:w-[25rem] sm:w-[20rem] w-[18rem] border border-black-200 rounded-md duration-100 hover:scale-110 cursor-pointer"
		>
			<div className="object-cover h-[15rem]">
				<img
					src={communityItem.uploadUrl}
					alt="썸네일"
					className="md:w-[25rem] sm:w-[20rem] w-[18rem] h-[15rem]"
				/>
			</div>
			<div className="mt-4 text-black-300 text-sm text-center">
				{communityType}
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
