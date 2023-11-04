import ComunityItemList from "./ComunityItemList";

const FourthSection = () => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<div className="flex justify-between items-center mt-12">
					<h1 className="mx-2 text-xl sm:text-2xl font-bold">
						후기도 볼 수 있어요
					</h1>
				</div>
				<ComunityItemList />
			</div>
		</>
	);
};

export default FourthSection;
