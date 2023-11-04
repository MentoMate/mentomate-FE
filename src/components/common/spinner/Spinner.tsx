import { HashLoader } from "react-spinners";

const Spinner = () => {
	return (
		<div className="flex justify-center items-center absolute bottom-0 left-0 w-full h-screen z-[100]">
			<HashLoader color="#36d7b7" />
		</div>
	);
};

export default Spinner;
