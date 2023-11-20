import {
	IMyCommunityItem,
	IMyCommunityItemProps,
} from "@/interface/myPageCommunity";
import CommunityItem from "@/components/userMyPage/userMyPageWriting/CommunityItem";
import { Link } from "react-router-dom";

const CommunityList = ({ data }: IMyCommunityItemProps) => {
	return (
		<div className="mt-10 mb-20">
			<div className="grid lg:grid-cols-2 md:grid-cols-1 lg:w-[45rem] md:w-[40rem] w-[20rem]">
				{data.map((communityItem: IMyCommunityItem) => (
					<Link
						key={communityItem.id}
						to={`/communityDetail/${communityItem.id}`}
						className="my-4 px-3 py-6 md:w-[18rem] sm:w-[20rem] w-[18rem] border border-black-200 rounded-md duration-100 hover:scale-110 cursor-pointer"
					>
						<CommunityItem communityItem={communityItem} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default CommunityList;
