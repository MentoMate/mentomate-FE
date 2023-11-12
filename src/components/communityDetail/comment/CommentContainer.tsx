import useAxios from "@/hooks/useAxios";
import { RefObject } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentSubmit from "./CommentSubmit";
import NonExistsComment from "./NonExistsComment";

interface IProps {
	commentRef: RefObject<HTMLDivElement>;
}

const CommentContainer = ({ commentRef }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const { communityId } = useParams();

	const getComments = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/${communityId}/comments`,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["communityComment", communityId], getComments);

	return (
		<div ref={commentRef}>
			<div className="flex mb-4 md:text-xl text-lg">
				<div className="font-bold">댓글</div>
				<div className="ml-2 text-main-color font-extrabold">
					{data.items.length}
				</div>
			</div>
			<CommentSubmit />
			{data.items.length === 0 ? (
				<NonExistsComment />
			) : (
				<CommentList comments={data.items} />
			)}
		</div>
	);
};

export default CommentContainer;
