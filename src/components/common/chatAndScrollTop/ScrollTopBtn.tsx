import { ReactComponent as GoTop } from "@assets/svg/goTop.svg";

const ScrollTopBtn = () => {
	const onClickScrollTopBtn = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="my-1.5">
			<button
				type="button"
				onClick={onClickScrollTopBtn}
				className="flex justify-center items-center w-20 h-20 border border-black-200 bg-white rounded-full cursor-pointer"
			>
				<GoTop width={30} height={30} />
			</button>
		</div>
	);
};

export default ScrollTopBtn;
