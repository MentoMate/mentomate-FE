import { lazy } from "react";

const MentoringRoom = lazy(() => import("@/components/mentoringRoom/Calender"));

const MentoringRoomPage = () => {
	return <MentoringRoom />;
};

export default MentoringRoomPage;
