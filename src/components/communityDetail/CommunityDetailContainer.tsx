import useAxios from "@/hooks/useAxios";
import { useRef } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommunityContent from "./CommunityContent";
import CommunityLikeAndComment from "./CommunityLikeAndComment";
import CommunitySideBar from "./CommunitySideBar";
import CommunityWriterInfo from "./CommunityWriterInfo";
import CommentContainer from "./comment/CommentContainer";

const CommunityDetailContainer = () => {
	const { communityId } = useParams();
	const commentRef = useRef<HTMLDivElement>(null);
	const { fetchDataUseAxios } = useAxios();

	console.log(communityId);

	const getInfo = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/posts/${communityId}/info`,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["communityDetail", communityId], getInfo);

	return (
		<div className="flex lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[15rem] mx-auto my-20">
			<div className="lg:w-[50rem] md:w-[30rem] sm:w-[20rem] w-[17rem]">
				<div className="md:text-3xl text-xl font-bold">{data.title}</div>
				<CommunityWriterInfo communityInfo={data} />
				<CommunityContent communityInfo={data} />
				<CommunityLikeAndComment communityInfo={data} />
				<CommentContainer commentRef={commentRef} />
			</div>
			<CommunitySideBar commentRef={commentRef} communityInfo={data} />
		</div>
	);
};

export default CommunityDetailContainer;
