import { IMentoringCount } from "@/interface/mainPageCount";
import AllMentoringDataList from "./AllMentoringDataList";

interface Iprops {
	data: IMentoringCount[];
}

const SixSection = ({ data }: Iprops) => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[60rem] sm:w-[40rem] mt-40">
				<div className="font-bold mx-auto lg:ml-5 lg:text-3xl md:text-base">
					현재 등록된 멘토링 데이터
				</div>
			</div>

			<AllMentoringDataList dataCount={data[0]} />
		</>
	);
};

export default SixSection;
