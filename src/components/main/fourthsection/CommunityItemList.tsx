import CommunityItem from "./CommunityItem";
import { ICommunityItem } from "@/interface/mainPageCommunity";

const CommunityItemList = ({ data }: { data: ICommunityItem[] }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3  place-items-center mx-auto mb-32 ">
			{data.map((Item: ICommunityItem) => (
				<CommunityItem item={Item} key={Item.postId} />
			))}
		</div>
	);
};

export default CommunityItemList;
