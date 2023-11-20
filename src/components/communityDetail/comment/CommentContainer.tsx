import Pagination from "@/components/common/pagination/Pagination";
import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { alertHandler } from "@/utils/alert";
import { RefObject } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import CommentSubmit from "./CommentSubmit";
import NonExistsComment from "./NonExistsComment";

interface IProps {
	readonly commentRef: RefObject<HTMLDivElement>;
	readonly commentCount: number;
}
console.log("asd");
const CommentContainer = ({ commentRef, commentCount }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const { communityId } = useParams();
	const { url } = useUrl("comment", communityId);

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

	return (
		<div ref={commentRef}>
			<div className="flex mb-4">
				<div className="font-bold">댓글</div>
				<div className="ml-1.5 text-main-color font-extrabold">
					{commentCount}
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
