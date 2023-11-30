import { IMentoringCount } from "@/interface/mainPageCount";
import AllMentoringDataList from "./AllMentoringDataList";

interface IProps {
	readonly data: IMentoringCount[];
}

const SixSection = ({ data }: IProps) => {
	return (
		<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem] pb-40">
			<div className="font-bold mx-auto lg:text-2xl md:text-base">
				현재 등록된 멘토링 데이터
			</div>
			<AllMentoringDataList dataCount={data[0]} />
		</div>
	);
};

export default SixSection;
