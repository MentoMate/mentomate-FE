import { ICommunityProps } from "@/interface/community";
console.log("asd");
const CommunityContent = ({ communityInfo }: ICommunityProps) => {
	return (
		<div>
			<div
				className="md:text-lg text-base text-black-600"
				dangerouslySetInnerHTML={{ __html: communityInfo.content }}
			></div>
		</div>
	);
};

export default CommunityContent;
