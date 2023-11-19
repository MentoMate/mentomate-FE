import Pagination from "@/components/common/pagination/Pagination";
import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { RefObject } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentSubmit from "./CommentSubmit";
import NonExistsComment from "./NonExistsComment";

interface IProps {
	readonly commentRef: RefObject<HTMLDivElement>;
}

const CommentContainer = ({ commentRef }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const { communityId } = useParams();
	const { url } = useUrl("comment", communityId);

	const getComments = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["communityComment", url], getComments);

	return (
		<div ref={commentRef}>
			<div className="flex mb-4">
				<div className="font-bold">댓글</div>
				<div className="ml-1.5 text-main-color font-extrabold">
					{data.items.length}
				</div>
			</div>
			<CommentSubmit />
			{data.items.length === 0 ? (
				<NonExistsComment />
			) : (
				<>
					<CommentList comments={data} />
					<Pagination totalPages={data.totalPages} />
				</>
			)}
		</div>
	);
};

export default CommentContainer;
