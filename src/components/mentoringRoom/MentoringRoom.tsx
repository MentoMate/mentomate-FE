import Calendar from "@/components/mentoringRoom/Calendar";
import MentoringInfoModal from "./MentoringInfoModal";

const MentoringRoom = () => {
	return (
		<>
			<div className=" mt-4 ml-2 mr-2">
				<Calendar />
				<MentoringInfoModal />
			</div>
		</>
	);
};
export default MentoringRoom;
