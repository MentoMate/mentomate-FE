import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as Share } from "@assets/svg/share.svg";
import { RefObject } from "react";

interface IProps {
	readonly commentRef: RefObject<HTMLDivElement>;
}

const CommunitySideBar = ({ commentRef }: IProps) => {
	const onClickMoveHandler = () => {
		if (commentRef.current !== null) {
			commentRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	};

	return (
		<div className="hidden sm:flex flex-col items-center sticky top-24 lg:ml-12 md:ml-10 sm:ml-8 lg:py-6 md:py-3 lg:w-[9rem] md:w-[7rem] w-[5rem] lg:h-[24rem] md:h-[17rem] sm:h-[15rem] bg-white rounded-lg">
			<button
				type="button"
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] border rounded-full"
			>
				<EmptyHeart width={30} height={30} />
			</button>
			<button
				type="button"
				onClick={onClickMoveHandler}
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] border rounded-full"
			>
				<Comment width={30} height={30} fill="#8A8A8A" />
			</button>
			<button
				type="button"
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] border rounded-full"
			>
				<Share width={25} height={25} fill="#8A8A8A" />
			</button>
		</div>
	);
};

export default CommunitySideBar;
