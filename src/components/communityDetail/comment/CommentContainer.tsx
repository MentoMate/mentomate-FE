import Comment from "./Comment";
import CommentSubmit from "./CommentSubmit";
import { RefObject } from "react";

interface IProps {
	commentRef: RefObject<HTMLDivElement>;
}

const CommentContainer = ({ commentRef }: IProps) => {
	const test = [1, 2];

	return (
		<div ref={commentRef}>
			<div className="flex mb-4 md:text-xl text-lg">
				<div className="font-bold">댓글</div>
				<div className="ml-2 text-main-color font-extrabold">2</div>
			</div>
			<CommentSubmit />
			{test.map((element) => (
				<div key={element}>
					<Comment />
				</div>
			))}
		</div>
	);
};

export default CommentContainer;
