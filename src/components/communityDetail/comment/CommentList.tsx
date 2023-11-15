import { IComment, ICommentsProps } from "@/interface/comment";
import Comment from "./Comment";

const CommentList = ({ comments }: ICommentsProps) => {
	return (
		<div>
			{comments.items.map((comment: IComment) => (
				<div key={comment.id}>
					<Comment comment={comment} />
				</div>
			))}
		</div>
	);
};

export default CommentList;
