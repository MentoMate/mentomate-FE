import { IComments, ICommentsProps } from "@/interface/comment";
import Comment from "./Comment";

const CommentList = ({ comments }: ICommentsProps) => {
	// TODO : 페이징 작업
	return (
		<>
			{comments.map((comment: IComments) => (
				<div key={comment.id}>
					<Comment comment={comment} />
				</div>
			))}
		</>
	);
};

export default CommentList;
