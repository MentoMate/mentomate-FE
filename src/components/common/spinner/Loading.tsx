import { PacmanLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="flex justify-center items-center w-full h-full absolute bottom-0 left-0 bg-[rgba(229,229,229,0.6)] z-[100]">
			<PacmanLoader color="#36d7b7" />
		</div>
	);
};

export default Loading;
