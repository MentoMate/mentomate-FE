import useAxios from "@/hooks/useAxios";
import { handleNextMonth, handlePrevMonth } from "@/utils/CalendarUtils";
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
import { useParams } from "react-router-dom";
import Loading from "../common/spinner/Loading";
import DayCellContent from "./DayCellContent";
import MentoringEndButton from "./MentoringEndButton";
import MentoringInfoModal from "./MentoringInfoModal";
import ScheduleAddModal from "./ScheduleAddModal";
import ScheduleReadModal from "./ScheduleReadModal";
import GroupChatBtn from "./groupChat/GroupChatBtn";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";

interface IMentoringPeriod {
	readonly startDate: string;
	readonly endDate: string;
}

const MyCalendar = () => {
	const { startDate, endDate, id } = useParams();

	const [mentoringPeriod, setMentoringPeriod] = useState<IMentoringPeriod>({
		startDate: `${startDate}`,
		endDate: `${endDate}`,
	});

	const startYear = parseInt(mentoringPeriod.startDate.split("-")[0]);
	const startMonth = parseInt(mentoringPeriod.startDate.split("-")[1]);
	const endYear = parseInt(mentoringPeriod.endDate.split("-")[0]);
	const endMonth = parseInt(mentoringPeriod.endDate.split("-")[1]);

	const [scheduleDate, setScheduleDate] = useState({
		year: startYear,
		month: startMonth,
	});
	const { isLoading, fetchDataUseAxios } = useAxios();
	const [hoveredDate, setHoveredDate] = useState(""); //Hover된 일정 날짜
	const [isScheduleAddModalOpen, setIsScheduleAddModalOpen] = useState(false); //선택된 일정에 대한 모달 상태
	const [selectedScheduleDate, setSelectedScheduleDate] = useState(""); //선택된 일정 날짜
	const [selectedEventDate, setSelectedEventDate] = useState(""); // 선택된 이벤트 날짜
	const [eventInfo, setEventInfo] = useState<EventImpl | null>(null); // 선택된 이벤트 제목
	const [isScheduleReadModalOpen, setIsScheduleReadModalOpen] = useState(false); //선택된 이벤트에 대한 모달 상태
	const [event, setEvent] = useState([]);
	const [prevButtonState, setPrevButtonState] = useState(false);
	const [nextButtonState, setNextButtonState] = useState(false);
	// 시작 기간과 종료 기간을 각각 년도와 달로 분리

	// 시작 기간과 종료 기간의 년도와 달이 같은지 비교
	const isValidRange = startYear === endYear && startMonth === endMonth;
	// 2023-05-04- 2023-05-12
	const validEnd = isValidRange
		? mentoringPeriod.endDate
		: `${endMonth === 12 ? endYear + 1 : endYear}-${String(
				(endMonth % 12) + 1,
		  ).padStart(2, "0")}-01`;

	const [validRange, setValidRange] = useState({
		start: String(startDate),
		end: String(validEnd),
	});

	const scheduleReadHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/mentoring/${id}/schedule?startDate=${validRange.start}&endDate=${validRange.end}`,
		});

		if (response) {
			if (response.status === 200) {
				setEvent(response.data);
			}
		} else {
		}
	};

	const prevMonthHandler = () => {
		handlePrevMonth(
			scheduleDate,
			mentoringPeriod,
			setScheduleDate,
			setValidRange,
		);
	};

	const nextMonthHandler = () => {
		handleNextMonth(
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
		setPrevButtonState(mentoringPeriod.startDate === validRange.start);
		setNextButtonState(mentoringPeriod.endDate === validRange.end);
	}, [validRange]);

	return (
		<>
			{isLoading && <Loading />}
			<div className="relative mx-auto mt-10 mb-20 lg:w-[60rem] ">
				<div className="flex justify-between mb-2">
					<div className="flex">
						<button
							className={`flex items-center mx-1 px-4 py-3 rounded-[0.3rem] text-sm font-semibold
  ${
		prevButtonState
			? "bg-gray-400 text-gray-700 cursor-not-allowed"
			: "bg-main-color text-white hover:bg-main-color  hover:bg-purple-100 transition-all duration-200"
	}`}
							onClick={prevMonthHandler}
							disabled={prevButtonState}
						>
							<Arrow width={15} height={15} className="rotate-180 mr-1.5" />
							이전 달
						</button>
						<button
							className={`flex items-center mx-1 px-4 py-3 rounded-[0.3rem] text-sm font-semibold
  ${
		nextButtonState
			? "bg-gray-400 text-gray-700 cursor-not-allowed"
			: "bg-main-color text-white hover:bg-main-color  hover:bg-purple-100 transition-all duration-200"
	}`}
							onClick={nextMonthHandler}
							disabled={nextButtonState}
						>
							다음 달
							<Arrow width={15} height={15} className="ml-1.5" />
						</button>
					</div>
					<div className="flex">
						<MentoringInfoModal />
						<MentoringEndButton />
					</div>
				</div>
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
					scheduleReadHandler={scheduleReadHandler}
				/>
			)}
			<div className="fixed my-1.5 bottom-20 lg:right-40 md:right-20 right-10 z-[98]">
				<GroupChatBtn />
			</div>
		</>
	);
};

export default MyCalendar;
