import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DayCellContent from "./DayCellContent";
import ScduleAddModal from "./ScheduleAddModal";
import ScduleReadModal from "./ScheduleReadModal";
import MentoringInfoModal from "./MentoringInfoModal";
import * as CalendarUtils from "./CalendarUtils";
import { useState, useEffect } from "react";

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

	const [calendarEvents, setCalendarEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const mentoringPeriod = {
		// 멘토링 기간
		startdate: "2023-06-08",
		enddate: "2025-05-03",
	};

	const [scheduleDate, setScheduleDate] = useState({
		// 첫 시작 달력 화면
		year: parseInt(mentoringPeriod.startdate.split("-")[0], 10), // 멘토링 기간중 시작기간의 년도,
		month: parseInt(mentoringPeriod.startdate.split("-")[1], 10), // 멘토링 기간중 시작기간의 월
	});

	const [validRange, setValidRange] = useState({
		// 풀캘린더 라이브러리 달력 범위 지정
		start: mentoringPeriod.startdate,
		end: `${
			scheduleDate.month === 12 ? scheduleDate.year + 1 : scheduleDate.year
		}-${String((scheduleDate.month % 12) + 1).padStart(2, "0")}-01`,
	});

	useEffect(() => {
		setIsLoading(true);
		// API 호출로 해당 월의 스케줄 데이터를 가져오는 로직을 추가
		// mentoring/schedule/month?month=${scheduleDate.year}-${scheduleDate.month}
		// 데이터를 가져온 후 캘린더 이벤트 객체로 변환하여 setCalendarEvents로 설정
		// 데이터를 가져온 후 isLoading을 false로 설정
	}, [scheduleDate]);

	const handlePrevMonth = () => {
		CalendarUtils.handlePrevMonth(
			scheduleDate,
			mentoringPeriod,
			setScheduleDate,
			setValidRange,
		);
	};

	const handleNextMonth = () => {
		CalendarUtils.handleNextMonth(
			scheduleDate,
			mentoringPeriod,
			setScheduleDate,
			setValidRange,
		);
	};
	console.log(validRange);
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
				<button className="bg-main-color" onClick={handlePrevMonth}>
					이전 달
				</button>
				<button className="bg-main-color" onClick={handleNextMonth}>
					다음 달
				</button>
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
					validRange={validRange}
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
