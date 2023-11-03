import { ReactComponent as CheckList } from "@assets/svg/checklist.svg";
import "react-datepicker/dist/react-datepicker.css";
import EsseentialPrice from "./EsseentialPrice";
import EssentialCategory from "./EssentialCategory";
import EssentialHeadCount from "./EssentialHeadCount";
import EssentialMentoringPeriod from "./EssentialMentoringPeriod";

const EssentialInfo = () => {
	return (
		<div className="mt-8 sm:px-8 px-6 py-10 border border-black-200 rounded-md">
			<div className="flex items-center font-semibold text-lg">
				<CheckList width={40} height={40} />
				필수 정보 입력란
			</div>
			<div className="flex flex-col mt-8 lg:w-[45rem] md:w-[30rem] sm:w-[25rem] mx-auto">
				<EssentialMentoringPeriod />
				<EssentialHeadCount />
				<EsseentialPrice />
				<EssentialCategory />
			</div>
		</div>
	);
};

export default EssentialInfo;
