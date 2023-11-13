import { IComments, ICommentsProps } from "@/interface/comment";
import Comment from "./Comment";

const CommentList = ({ comments }: ICommentsProps) => {
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
