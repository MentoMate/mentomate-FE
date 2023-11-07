import { IMentoringCount } from "@/interface/mainPageCount";

interface IProps {
	readonly dataCount: IMentoringCount;
}

const AllMentoringDataList = ({ dataCount }: IProps) => {
	console.log(dataCount);
	return (
		<div className="flex flex-wrap justify-center  items-center mx-auto lg:w-[60rem] mt-10 mb-64 ">
			<div className="flex  items-center  p-4 lg:w-[30rem]  ">
				<div className=" shadow-md h-full rounded-2xl border border-[#E5E5E5]">
					<div className=" p-4 w-[15rem] lg:w-[25rem] ">
						<div className="font-bold mb-2">전체 멘토링 수</div>
						<h1 className="mb-2 text-sm">{dataCount.mentoringCount}</h1>
					</div>
				</div>
			</div>
			<div className="flex  items-center  p-4 lg:w-[30rem]  ">
				<div className=" shadow-md h-full rounded-2xl border border-[#E5E5E5]">
					<div className=" p-4 w-[15rem] lg:w-[25rem]  ">
						<div className="font-bold mb-2">참여 멘토 수</div>
						<h1 className="mb-2 text-sm">{dataCount.mentorCount}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllMentoringDataList;
