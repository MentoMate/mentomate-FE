import useAxios from "@/hooks/useAxios";
import CommentContainer from "./comment/CommentContainer";
import CommunityContent from "./CommunityContent";
import CommunityLikeAndComment from "./CommunityLikeAndComment";
import CommunitySideBar from "./CommunitySideBar";
import CommunityWriterInfo from "./CommunityWriterInfo";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const CommunityDetailContainer = () => {
	const { communityId } = useParams();
	const commentRef = useRef<HTMLDivElement>(null);
	const { fetchDataUseAxios } = useAxios();

	const getInfo = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/posts/${communityId}/info`,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["communityDetail"], getInfo);

	useEffect(() => {
		getInfo();
	}, []);

	return (
		<div className="flex lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[15rem] mx-auto my-20">
			<div className="lg:w-[50rem] md:w-[30rem] sm:w-[20rem] w-[17rem]">
				<div className="md:text-3xl text-xl font-bold">
					코딩 해볼려고 하는데 난이도 어떤가요 ?
				</div>
				<CommunityWriterInfo communityInfo={data} />
				<CommunityContent communityInfo={data} />
				<CommunityLikeAndComment communityInfo={data} />
				<CommentContainer commentRef={commentRef} />
			</div>
			<CommunitySideBar commentRef={commentRef} />
		</div>
	);
};

export default CommunityDetailContainer;
