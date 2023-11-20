import { ICommunityItem } from "@/interface/community";
import CommunityItem from "./CommunityItem";

interface IProps {
	readonly communityList: ICommunityItem[];
}
console.log("asd");
const CommunityList = ({ communityList }: IProps) => {
	return (
		<div className="mb-20">
			<div className="grid lg:grid-cols-3 md:grid-cols-1 place-items-center mx-auto lg:w-[60rem] md:w-[40rem] w-[20rem]">
				{communityList.map((communityItem: ICommunityItem) => (
					<CommunityItem key={communityItem.id} communityItem={communityItem} />
				))}
			</div>
		</div>
	);
};

export default CommunityList;
