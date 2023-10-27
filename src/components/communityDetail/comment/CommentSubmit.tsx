import { ReactComponent as CommentIcon } from "@assets/svg/comment.svg";

const CommentSubmit = () => {
	return (
		<form className="flex items-center mb-8 py-3 border border-black-200 rounded-md">
			<CommentIcon className="ml-4 md:mr-2 md:w-[2rem] sm:w-[1.5rem] md:h-[2rem] sm:h-[1.5rem] w-[1.3rem] h-[1.3rem] fill-black-300" />
			<input
				type="text"
				className="mx-auto lg:w-[45rem] md:w-[35rem] sm:w-[25rem] w-[10rem] outline-none md:placeholder:text-base sm:placeholder:text-sm placeholder:text-[0.8rem] md:text-base text-sm"
				placeholder="여러분의 댓글을 남겨주세요 :)"
			/>
		</form>
	);
};

export default CommentSubmit;
