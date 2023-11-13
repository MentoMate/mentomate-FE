import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DayCellContent from "./DayCellContent";
import ScduleAddModal from "./ScheduleAddModal";
import ScduleReadModal from "./ScheduleReadModal";
import MentoringInfoModal from "./MentoringInfoModal";
import * as CalendarUtils from "./CalendarUtils";
import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import {
	CustomContentGenerator,
	DayCellContentArg,
	EventClickArg,
	EventHoveringArg,
} from "@fullcalendar/core/index.js"; //풀캘린더 라이브러리에서 내보낸 특정 타입
import { EventImpl } from "@fullcalendar/core/internal";
import Loading from "../common/spinner/Loading";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";

const MyCalendar = () => {
	const [hoveredDate, setHoveredDate] = useState(""); //Hover된 일정 날짜
	const [isScduleAddModalOpen, setIsScduleAddModalOpen] = useState(false); //선택된 일정에 대한 모달 상태
	const [scduleDate, setScduleDate] = useState(""); //선택된 일정 날짜
	const [selectedEventDate, setSelectedEventDate] = useState(""); // 선택된 이벤트 날짜
	const [eventInfo, setEventInfo] = useState<EventImpl | null>(null); // 선택된 이벤트 제목
	const [isScduleReadModalOpen, setIsScduleReadModalOpen] = useState(false); //선택된 이벤트에 대한 모달 상태

	const [eventa, setEvent] = useState([]);

	const { isLoading, fetchDataUseAxios } = useAxios();
	const mentoringPeriod = {
		// 멘토링 기간
		startdate: "2023-09-08",
		enddate: "2024-03-15",
	};

	const today = new Date();

	const [scheduleDate, setScheduleDate] = useState({
		year: today.getFullYear(),
		month: today.getMonth() + 1, // getMonth()는 0부터 시작하므로 1을 더합니다.
	});

	const [validRange, setValidRange] = useState({
		// 풀캘린더 라이브러리 달력 범위 지정
		start: mentoringPeriod.startdate,
		end: `${
			scheduleDate.month === 12 ? scheduleDate.year + 1 : scheduleDate.year
		}-${String((scheduleDate.month % 12) + 1).padStart(2, "0")}-01`,
	});

	const scduleReadHandler = async () => {
		//
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/mentoring/${3}/schedule?startDate=${validRange.start}&endDate=${
				validRange.end
			}`,
		});
		if (response) {
			setEvent(response.data);
		}
	};

	useEffect(() => {
		// API 호출로 해당 월의 스케줄 데이터를 가져오는 로직을 추가 validRange값이 변할떄마다 렌더링

		scduleReadHandler();
	}, [validRange]);

	const prevMonthhandler = () => {
		CalendarUtils.handlePrevMonth(
			scheduleDate,
			mentoringPeriod,
			setScheduleDate,
			setValidRange,
		);
	};

	const nextMonthhandler = () => {
		CalendarUtils.handleNextMonth(
			scheduleDate,
			mentoringPeriod,
			setScheduleDate,
			setValidRange,
		);
	};

	const customDayCellContent = (
		arg: CustomContentGenerator<DayCellContentArg>,
	) => (
		<DayCellContent
			arg={arg}
			hoveredDate={hoveredDate}
			setHoveredDate={setHoveredDate}
			events={eventa}
			onClickAddEventhandler={onClickAddEventhandler}
		/>
	);

	const onClickAddEventhandler = (e: React.MouseEvent, date: string) => {
		lockScroll();
		e.stopPropagation();
		setScduleDate(date);
		setIsScduleAddModalOpen(true);
	};

	const onClickReadEventhandler = (clickInfo: EventClickArg) => {
		lockScroll();

		const { event } = clickInfo;
		const date = event.start ? new Date(event.start) : null;

		if (date) {
			const formateventdate = `${date.getFullYear()}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

			setSelectedEventDate(formateventdate);
			setEventInfo(event);
			setIsScduleReadModalOpen(true); // 모달 열기
		}
	};

	const eventMouseEnterHandler = (mouseEnterInfo: EventHoveringArg) => {
		const eventDom = mouseEnterInfo.el;
		eventDom.classList.add("cursor-pointer");
	};

	const eventMouseLeaveHandler = (mouseLeaveInfo: EventHoveringArg) => {
		const eventDom = mouseLeaveInfo.el;
		eventDom.classList.remove("cursor-pointer");
	};

	return (
		<>
			{isLoading && <Loading />}
			<div className="relative mx-auto mt-10 mb-20 lg:w-[60rem] ">
				<button className="bg-main-color" onClick={prevMonthhandler}>
					이전 달
				</button>
				<button className="bg-main-color" onClick={nextMonthhandler}>
					다음 달
				</button>
				<FullCalendar
					plugins={[interactionPlugin, dayGridPlugin]}
					initialView="dayGridMonth"
					height="80vh"
					events={eventa}
					headerToolbar={{
						start: "title",
						center: "",
						end: "",
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
					eventInfo={eventInfo}
				/>
			)}
		</>
	);
};

export default MyCalendar;
