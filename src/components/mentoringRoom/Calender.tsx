import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "@/components/common/header/Header";
import BottomNav from "./BottomNav";
import MentoringInfoModal from "./MentoringInfoModal";
import { useState } from "react";

import ScduleAddModal from "./ScduleAddModal";
const MyCalendar = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};
	const events = [
		{
			title: "이벤트 1",
			start: "2023-10-26",
			end: "2023-10-30",
			description: "이벤트 1 설명",
			backgroundColor: "#ABDEE6",
			borderColor: "#ABDEE6",
		},
		{
			title: "이벤트 2",
			start: "2023-11-05",
			description: "이벤트 2 설명",
			backgroundColor: "#ABDEE6",
			borderColor: "#ABDEE6",
		},
		// 추가 이벤트를 원하는 만큼 정의할 수 있습니다.
	];
	return (
		<>
			<Header />
			<div className="relative mt-4 ml-2 mr-2">
				<FullCalendar
					plugins={[dayGridPlugin]}
					initialView="dayGridMonth"
					height="100vh"
					events={events}
					headerToolbar={{
						start: "title",
						center: "",
						end: "prev next",
					}}
					locale="ko"
				/>
				<MentoringInfoModal />

				<ScduleAddModal />

				<BottomNav />
			</div>
		</>
	);
};

export default MyCalendar;
