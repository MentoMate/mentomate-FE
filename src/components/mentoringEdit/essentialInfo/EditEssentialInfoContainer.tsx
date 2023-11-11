import { ReactComponent as CheckList } from "@assets/svg/checklist.svg";
import "react-datepicker/dist/react-datepicker.css";
import EditEssentialPrice from "./EditEssentialPrice";
import EditEssentialCategory from "./EditEssentialCategory";
import EditEssentialHeadCount from "./EditEssentialHeadCount";
import EditEssentialMentoringPeriod from "./EditEssentialMentoringPeriod";
import EditEssentialThumbNail from "./EditEssentialThumbNail";

const EditEssentialInfoContainer = () => {
	return (
		<div className="mt-8 sm:px-8 px-6 py-10 border border-black-200 rounded-md">
			<div className="flex items-center font-semibold text-lg">
				<CheckList width={40} height={40} />
				필수 정보 입력란
			</div>
			<div className="flex flex-col mt-8 lg:w-[45rem] md:w-[30rem] sm:w-[25rem] mx-auto">
				<EditEssentialThumbNail />
				<EditEssentialMentoringPeriod />
				<EditEssentialHeadCount />
				<EditEssentialPrice />
				<EditEssentialCategory />
			</div>
		</div>
	);
};

export default EditEssentialInfoContainer;
