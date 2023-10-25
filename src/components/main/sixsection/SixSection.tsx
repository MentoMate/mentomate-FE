import AllMentoringDataList from "./AllMentoringDataList";
const SixSection = () => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[80rem] sm:w-[40rem] mt-40">
				<div className="font-bold ml-5 lg:text-3xl md:text-base">
					현재 등록된 멘토링 데이터
				</div>
			</div>
			<AllMentoringDataList />
		</>
	);
};

export default SixSection;
