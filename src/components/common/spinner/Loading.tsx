import { PulseLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-[rgba(229,229,229,0.5)]">
			<PulseLoader color="#36d7b7" />
		</div>
	);
};

export default Loading;
