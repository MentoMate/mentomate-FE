import { ICommunityList } from "@/interface/community";
import CommunityItem from "./CommunityItem";

interface IProps {
	readonly communityList: ICommunityList[];
}

const CommunityList = ({ communityList }: IProps) => {
	return (
		<div className="mt-10 mb-20">
			<div className="grid lg:grid-cols-2 md:grid-cols-1 place-items-center mx-auto lg:w-[60rem] md:w-[40rem] w-[20rem]">
				{communityList.map((communityItem: ICommunityList) => (
					<CommunityItem communityItem={communityItem} />
				))}
			</div>
		</div>
	);
};

export default CommunityList;
