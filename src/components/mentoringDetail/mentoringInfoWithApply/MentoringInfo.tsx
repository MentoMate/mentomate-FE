import { IMentoringDetailProps } from "@/interface/mentoringDetailInfo";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";

const MentoringInfo = ({ data }: IMentoringDetailProps) => {
	return (
		<>
			<div className="lg:text-xl text-base font-bold">{data.title}</div>
			<div className="mt-4 lg:text-sm md:text-[0.7rem]">
				<div className="flex items-center mb-2">
					<Calendar width={20} height={20} className="mr-2" />
					{data.startDate} ~ {data.endDate}
				</div>
				<div className="flex items-center mb-2">
					<Cash width={20} height={20} className="mr-2" />
					{data.amount} ₩
				</div>
				<div className="flex items-center">
					<Group width={20} height={20} className="mr-2" />
					{data.numberOfPeople}명
				</div>
			</div>
		</>
	);
};

export default MentoringInfo;
