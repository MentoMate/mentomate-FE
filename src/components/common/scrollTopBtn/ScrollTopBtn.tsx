import { ReactComponent as GoTop } from "@assets/svg/goTop.svg";

const ScrollTopBtn = () => {
	const onClickScrollTopBtn = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="flex justify-end sticky bottom-20 lg:mr-40 mr-10 mb-20">
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
