const AllMentoringDataList = () => {
	return (
		<div className="flex flex-wrap justify-center  items-center mx-auto lg:w-[80rem] mt-10 mb-64 ">
			<div className="flex  items-center  p-4 lg:w-[35rem]  ">
				<div className=" shadow-md h-full rounded-2xl border border-[#E5E5E5]">
					<div className=" p-4 w-[15rem] lg:w-[30rem] ">
						<div className="font-bold mb-2">전체 멘토링 수</div>
						<h1 className="mb-2 text-sm">{50}</h1>
					</div>
				</div>
			</div>
			<div className="flex  items-center  p-4 lg:w-[35rem]  ">
				<div className=" shadow-md h-full rounded-2xl border border-[#E5E5E5]">
					<div className=" p-4 w-[15rem] lg:w-[30rem]  ">
						<div className="font-bold mb-2">참여 멘토 수</div>
						<h1 className="mb-2 text-sm">{5}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllMentoringDataList;
