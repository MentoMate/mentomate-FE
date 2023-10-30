import Header from "@/components/common/header/Header";
import Calendar from "@/components/mentoringRoom/Calender";
import MentoringInfoModal from "./MentoringInfoModal";

const MentoringRoom = () => {
	return (
		<>
			<div className="relative mt-4 ml-2 mr-2">
				<Calendar />
				<MentoringInfoModal />
			</div>
		</>
	);
};
export default MentoringRoom;
