import { ICommunityItemInProps } from "@/interface/mainPageInterface";
import { ICommunityItem } from "@/interface/mainPageCommunity";
import CommunityItem from "./CommunityItem";

const CommunityItemList = ({ data }: ICommunityItemInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 place-items-center mx-auto mb-32 ">
			{data.map((element: ICommunityItem) => (
				<CommunityItem data={element} key={element.postId} />
			))}
		</div>
	);
};

export default CommunityItemList;
