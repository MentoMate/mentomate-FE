import Pagination from "@/components/common/pagination/Pagination";
import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { alertHandler } from "@/utils/alert";
import { RefObject, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentSubmit from "./CommentSubmit";
import NonExistsComment from "./NonExistsComment";
import { useRecoilValue } from "recoil";
import { communityLikeAndCommentCnt } from "@/state/followStats";
import { ICommentsInfo } from "@/interface/comment";

interface IProps {
	readonly commentRef: RefObject<HTMLDivElement>;
	readonly commentCount: number;
}

const CommentContainer = ({ commentRef }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const { communityId } = useParams();
	const { url } = useUrl("comment", communityId);
	const likeAndCommentCnt = useRecoilValue(communityLikeAndCommentCnt);
	const [commentList, setCommentList] = useState<ICommentsInfo>({
		totalPages: 0,
		items: [],
	});

	const getComments = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			} else {
				alertHandler("error", "잠시 후에 다시 조회해주세요.");
				return {
					items: [],
					totalPages: 1,
				};
			}
		}
	};

	const { data } = useQuery(["communityComment", url], getComments);

	useEffect(() => {
		if (data) {
			setCommentList(data);
		}
	}, [data]);

	return (
		<div ref={commentRef}>
			<div className="flex mb-4">
				<div className="font-bold">댓글</div>
				<div className="ml-1.5 text-main-color font-extrabold">
					{likeAndCommentCnt.commentCnt}
				</div>
			</div>
			<CommentSubmit />
			{commentList.items.length === 0 ? (
				<NonExistsComment />
			) : (
				<>
					<CommentList comments={commentList} setCommentList={setCommentList} />
					<Pagination totalPages={commentList.totalPages} />
				</>
			)}
		</div>
	);
};

export default CommentContainer;
