import { HashLoader } from "react-spinners";
console.log("asd");
const Spinner = () => {
	return (
		<div className="flex justify-center items-center fixed bottom-0 left-0 w-full h-screen z-[100]">
			<HashLoader color="#36d7b7" />
		</div>
	);
};

export default Spinner;
