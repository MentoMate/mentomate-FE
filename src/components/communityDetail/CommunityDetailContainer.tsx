import useAxios from "@/hooks/useAxios";
import { communityLike, communityLikeAndCommentCnt } from "@/state/followStats";
import { alertHandler } from "@/utils/alert";
import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import CommunityContent from "./CommunityContent";
import CommunityLikeAndComment from "./CommunityLikeAndComment";
import CommunitySideBar from "./CommunitySideBar";
import CommunityWriterInfo from "./CommunityWriterInfo";
import CommentContainer from "./comment/CommentContainer";

const CommunityDetailContainer = () => {
	const { communityId } = useParams();
	const commentRef = useRef<HTMLDivElement>(null);
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();
	const setLike = useSetRecoilState(communityLike);
	const setLikeAndCommentCnt = useSetRecoilState(communityLikeAndCommentCnt);

	const getInfo = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/posts/${communityId}/info`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 400) {
				alertHandler("error", "존재하지 않는 게시글입니다.");
				navigate("/community");
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
				navigate("/community");
			}
		}
	};

	const { data } = useQuery(["communityDetail", communityId], getInfo);

	useEffect(() => {
		if (data) {
			setLike(data.like);
		}
	}, [data]);

	useEffect(() => {
		setLikeAndCommentCnt({
			postLikeCnt: data.postLikesCount,
			commentCnt: data.commentCount,
		});
	}, []);

	return (
		<div className="flex lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[15rem] mx-auto my-20">
			<div className="lg:w-[50rem] md:w-[30rem] sm:w-[20rem] w-[17rem]">
				<div className="text-xl font-bold">{data.title}</div>
				<CommunityWriterInfo communityInfo={data} />
				<CommunityContent communityInfo={data} />
				<CommunityLikeAndComment communityInfo={data} />
				<CommentContainer
					commentRef={commentRef}
					commentCount={data.commentCount}
				/>
			</div>
			<CommunitySideBar commentRef={commentRef} communityInfo={data} />
		</div>
	);
};

export default CommunityDetailContainer;
