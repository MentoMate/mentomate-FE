import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";

const MentoringInfo = () => {
	return (
		<>
			<div className="lg:text-xl text-base font-bold">
				대기업 프로젝트 개발자와 함께하는 면접 트레이닝
			</div>
			<div className="mt-4 lg:text-sm md:text-[0.7rem]">
				<div className="flex items-center mb-2">
					<Calendar width={20} height={20} className="mr-2" />
					2023.10.25 ~ 2023.10.31
				</div>
				<div className="flex items-center mb-2">
					<Cash width={20} height={20} className="mr-2" />
					59,900 ₩
				</div>
				<div className="flex items-center">
					<Group width={20} height={20} className="mr-2" />
					6명
				</div>
			</div>
		</>
	);
};

export default MentoringInfo;
