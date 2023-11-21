import { ICommunityItemInProps } from "@/interface/mainPageInterface";
import { ICommunityItem } from "@/interface/mainPageCommunity";
import CommunityItem from "./CommunityItem";

const CommunityItemList = ({ data }: ICommunityItemInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 place-items-center mx-auto lg:w-[60rem] md:w-[30rem] w-[15rem]">
			{data.map((element: ICommunityItem) => (
				<CommunityItem data={element} key={element.postId} />
			))}
		</div>
	);
};

export default CommunityItemList;
