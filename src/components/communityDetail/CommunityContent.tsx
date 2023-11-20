import { ICommunityProps } from "@/interface/community";
console.log("asd");
const CommunityContent = ({ communityInfo }: ICommunityProps) => {
	return (
		<div
			className="leading-5 text-[0.95rem] text-black-600"
			dangerouslySetInnerHTML={{ __html: communityInfo.content }}
		/>
	);
};

export default CommunityContent;
