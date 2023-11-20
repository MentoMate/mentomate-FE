import { PacmanLoader } from "react-spinners";
console.log("asd");
const Loading = () => {
	return (
		<div className="flex justify-center items-center w-full h-full fixed bottom-0 left-0 bg-[rgba(229,229,229,0.6)] z-[100]">
			<PacmanLoader color="#8AAAE5" />
		</div>
	);
};

export default Loading;
