import useAxios from "@/hooks/useAxios";
import { lockScroll } from "@/utils/controlBodyScroll";
import {
	CustomContentGenerator,
	DayCellContentArg,
	EventClickArg,
	EventHoveringArg,
} from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useEffect, useState } from "react";
import Loading from "../common/spinner/Loading";
import DayCellContent from "./DayCellContent";
import MentoringInfoModal from "./MentoringInfoModal";
import ScheduleAddModal from "./ScheduleAddModal";
import ScheduleReadModal from "./ScheduleReadModal";
import { handleNextMonth, handlePrevMonth } from "@/utils/CalendarUtils";
import { useParams } from "react-router-dom";
import MentoringEndButton from "./MentoringEndButton";
import GroupChatBtn from "./groupChat/GroupChatBtn";
console.log("asd");
interface IMentoringPeriod {
	startDate: string | "";
	endDate: string | "";
}

const today = new Date();

const MyCalendar = () => {
	const params = useParams();

	const MENTORING_PERIOD: IMentoringPeriod = {
		startDate: params.startDate || "",
		endDate: params.endDate || "",
	};

	const { isLoading, fetchDataUseAxios } = useAxios();
	const [hoveredDate, setHoveredDate] = useState(""); //Hover된 일정 날짜
	const [isScheduleAddModalOpen, setIsScheduleAddModalOpen] = useState(false); //선택된 일정에 대한 모달 상태
	const [selectedScheduleDate, setSelectedScheduleDate] = useState(""); //선택된 일정 날짜
	const [selectedEventDate, setSelectedEventDate] = useState(""); // 선택된 이벤트 날짜
	const [eventInfo, setEventInfo] = useState<EventImpl | null>(null); // 선택된 이벤트 제목
	const [isScheduleReadModalOpen, setIsScheduleReadModalOpen] = useState(false); //선택된 이벤트에 대한 모달 상태
	const [event, setEvent] = useState([]);
	const [scheduleDate, setScheduleDate] = useState({
		year: today.getFullYear(),
		month: today.getMonth() + 1,
	});
	// 시작 기간과 종료 기간을 각각 년도와 달로 분리
	const startYear = parseInt(MENTORING_PERIOD.startDate.split("-")[0]);
	const startMonth = parseInt(MENTORING_PERIOD.startDate.split("-")[1]);
	const endYear = parseInt(MENTORING_PERIOD.endDate.split("-")[0]);
	const endMonth = parseInt(MENTORING_PERIOD.endDate.split("-")[1]);

	// 시작 기간과 종료 기간의 년도와 달이 같은지 비교
	const isValidRange = startYear === endYear && startMonth === endMonth;

	const validEnd = isValidRange
		? MENTORING_PERIOD.endDate
		: `${
				scheduleDate.month === 12 ? scheduleDate.year + 1 : scheduleDate.year
		  }-${String((scheduleDate.month % 12) + 1).padStart(2, "0")}-01`;

	const [validRange, setValidRange] = useState({
		start: MENTORING_PERIOD.startDate,
		end: validEnd,
	});

	const scheduleReadHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/mentoring/${params.id}/schedule?startDate=${validRange.start}&endDate=${validRange.end}`,
		});

		if (response) {
			if (response.status === 200) {
				setEvent(response.data);
			}
		}
	};

	const prevMonthHandler = () => {
		handlePrevMonth(
			scheduleDate,
			MENTORING_PERIOD,
			setScheduleDate,
			setValidRange,
		);
	};

	const nextMonthHandler = () => {
		handleNextMonth(
			scheduleDate,
			MENTORING_PERIOD,
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
			events={event}
			onClickAddEventHandler={onClickAddEventHandler}
		/>
	);

	const onClickAddEventHandler = (e: React.MouseEvent, date: string) => {
		lockScroll();
		e.stopPropagation();
		setSelectedScheduleDate(date);
		setIsScheduleAddModalOpen(true);
	};

	const onClickReadEventHandler = (clickInfo: EventClickArg) => {
		lockScroll();

		const { event } = clickInfo;
		const date = event.start ? new Date(event.start) : null;

		if (date) {
			const formatEventDate = `${date.getFullYear()}-${(date.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
			setSelectedEventDate(formatEventDate);
			setEventInfo(event);
			setIsScheduleReadModalOpen(true);
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

	useEffect(() => {
		scheduleReadHandler();
	}, [validRange]);

	return (
		<>
			{isLoading && <Loading />}
			<div className="relative mx-auto mt-10 mb-20 lg:w-[60rem] ">
				<button className="bg-main-color" onClick={prevMonthHandler}>
					이전 달
				</button>
				<button className="bg-main-color" onClick={nextMonthHandler}>
					다음 달
				</button>
				<FullCalendar
					plugins={[interactionPlugin, dayGridPlugin]}
					initialView="dayGridMonth"
					height="80vh"
					events={event}
					headerToolbar={{
						start: "title",
						center: "",
						end: "",
					}}
					validRange={validRange}
					locale="ko"
					dayCellContent={customDayCellContent} // 날짜 셀의 모양과 동작을 제어
					eventClick={onClickReadEventHandler} // 이벤트 클릭 핸들러 연결
					eventMouseEnter={eventMouseEnterHandler} // 마우스가 이벤트에 진입할 때
					eventMouseLeave={eventMouseLeaveHandler} // 마우스가 이벤트를 떠날 때
				/>
				<MentoringInfoModal />
				<MentoringEndButton />
			</div>

			{isScheduleAddModalOpen && (
				<ScheduleAddModal
					scheduleReadHandler={scheduleReadHandler}
					formattedDate={selectedScheduleDate}
					closeModal={() => setIsScheduleAddModalOpen(false)}
				/>
			)}
			{isScheduleReadModalOpen && (
				<ScheduleReadModal
					formattedDate={selectedEventDate}
					closeModal={() => setIsScheduleReadModalOpen(false)}
					eventInfo={eventInfo}
				/>
			)}
			<div className="fixed my-1.5 bottom-20 right-40 z-[98]">
				<GroupChatBtn />
			</div>
		</>
	);
};

export default MyCalendar;
