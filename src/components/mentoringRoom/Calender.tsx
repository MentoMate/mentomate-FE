import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DayCellContent from "./DayCellContent";
import ScduleAddModal from "./ScduleAddModal";
import ScduleReadModal from "./ScduleReadModal";
import MentoringInfoModal from "./MentoringInfoModal";

import { useState } from "react";

const events = [
	{
		title: "치어리더가 되기 위한 준비 과정 그리고 노하우(1주차)",
		start: "2023-10-09",
		description: "오늘 주제는 ~~~~",
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
];

const MyCalendar = () => {
	const [hoveredDate, setHoveredDate] = useState(""); //Hover된 일정 날짜
	const [isScduleAddModalOpen, setIsScduleAddModalOpen] = useState(false); //선택된 일정에 대한 모달 상태
	const [scduleDate, setScduleDate] = useState(""); //선택된 일정 날짜
	const [selectedEventDate, setSelectedEventDate] = useState(""); // 선택된 이벤트 날짜
	const [eventTitle, setEventTitle] = useState(""); // 선택된 이벤트 제목
	const [eventDescription, setEventDescription] = useState(""); // 선택된 이벤트 세부정보
	const [isScduleReadModalOpen, setIsScduleReadModalOpen] = useState(false); //선택된 이벤트에 대한 모달 상태

	const customDayCellContent = (arg: any) => (
		<DayCellContent
			arg={arg}
			hoveredDate={hoveredDate}
			setHoveredDate={setHoveredDate}
			events={events}
			onClickAddEventhandler={onClickAddEventhandler}
		/>
	);

	const onClickAddEventhandler = (e: React.MouseEvent, date: string) => {
		e.stopPropagation();
		setScduleDate(date);
		setIsScduleAddModalOpen(true);
	};

	const onClickReadEventhandler = (clickInfo: any) => {
		const { event } = clickInfo;
		const date = new Date(event.start);
		const formateventdate = `${date.getFullYear()}-${(date.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

		setSelectedEventDate(formateventdate);
		setEventDescription(event.extendedProps.description);
		setEventTitle(event.title);
		setIsScduleReadModalOpen(true); // 모달 열기
	};

	const eventMouseEnterHandler = (mouseEnterInfo: any) => {
		const eventDom = mouseEnterInfo.el;
		eventDom.classList.add("cursor-pointer");
	};

	const eventMouseLeaveHandler = (mouseLeaveInfo: any) => {
		const eventDom = mouseLeaveInfo.el;
		eventDom.classList.remove("cursor-pointer");
	};
	return (
		<>
			<div className="relative mx-auto mt-10 mb-20 lg:w-[60rem] ">
				<FullCalendar
					plugins={[interactionPlugin, dayGridPlugin]}
					initialView="dayGridMonth"
					height="80vh"
					events={events}
					headerToolbar={{
						start: "title",
						center: "",
						end: "prev next",
					}}
					locale="ko"
					dayCellContent={customDayCellContent} // 날짜 셀의 모양과 동작을 제어
					eventClick={onClickReadEventhandler} // 이벤트 클릭 핸들러 연결
					eventMouseEnter={eventMouseEnterHandler} // 마우스가 이벤트에 진입할 때
					eventMouseLeave={eventMouseLeaveHandler} // 마우스가 이벤트를 떠날 때
				/>
				<MentoringInfoModal />
			</div>

			{isScduleAddModalOpen && (
				<ScduleAddModal //일정 추가 시 모달
					formattedDate={scduleDate}
					closeModal={() => setIsScduleAddModalOpen(false)}
				/>
			)}
			{isScduleReadModalOpen && (
				<ScduleReadModal //일정 보기 시 모달
					formattedDate={selectedEventDate}
					closeModal={() => setIsScduleReadModalOpen(false)}
					eventText={eventTitle}
					eventDescription={eventDescription}
				/>
			)}
		</>
	);
};

export default MyCalendar;
