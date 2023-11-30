import {
	IMyCommunityItem,
	IMyCommunityItemProps,
} from "@/interface/myPageCommunity";
import CommunityItem from "@/components/userMyPage/userMyPageWriting/CommunityItem";

const CommunityList = ({ data }: IMyCommunityItemProps) => {
	return (
		<div className="mt-10 mb-20">
			<div className="grid lg:grid-cols-2 md:grid-cols-1 lg:w-[45rem] md:w-[40rem] w-[20rem]">
				{data.map((communityItem: IMyCommunityItem) => (
					<CommunityItem key={communityItem.id} communityItem={communityItem} />
				))}
			</div>
		</div>
	);
};

export default CommunityList;
