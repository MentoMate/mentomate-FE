import { HashLoader } from "react-spinners";

const LazyLoading = () => {
	return (
		<div className="flex justify-center items-center w-full min-h-min-height z-[100]">
			<HashLoader color="#8AAAE5" />
		</div>
	);
};

export default LazyLoading;
