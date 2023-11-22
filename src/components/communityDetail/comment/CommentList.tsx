import { IComment, ICommentsProps } from "@/interface/comment";
import Comment from "./Comment";

const CommentList = ({ comments, setCommentList }: ICommentsProps) => {
	return (
		<div>
			{comments.items.map((comment: IComment, index: number) => (
				<div key={comment.id}>
					<Comment
						comment={comment}
						comments={comments}
						setCommentList={setCommentList}
						index={index}
					/>
				</div>
			))}
		</div>
	);
};

export default CommentList;
