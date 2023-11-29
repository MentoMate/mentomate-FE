import { mentorState } from "@/state/mentorState";
import { useRecoilValue } from "recoil";

interface IDayCellContentProps {
	readonly arg: any;
	readonly hoveredDate: string;
	readonly setHoveredDate: any;
	readonly events: any;
	readonly onClickAddEventHandler: any;
}
const DayCellContent = ({
	arg,
	hoveredDate,
	setHoveredDate,
	events,
	onClickAddEventHandler,
}: IDayCellContentProps) => {
	const mentorCheck = useRecoilValue(mentorState);
	const formatDate = `${arg.date.getFullYear()}-${(arg.date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${arg.date.getDate().toString().padStart(2, "0")}`;
	const isHovered = hoveredDate === formatDate;
	const hasEvent = events.some((event: any) => event.start === formatDate);

	const onMouseEnterHandler = () => {
		if (!isHovered) {
			setHoveredDate(formatDate);
		}
	};

	const onMouseLeaveHandler = () => {
		if (isHovered) {
			setHoveredDate(" ");
		}
	};

	return (
		<div
			onMouseEnter={onMouseEnterHandler}
			onMouseLeave={onMouseLeaveHandler}
			className={`cell ${isHovered ? "hovered" : ""} relative`}
		>
			{arg.dayNumberText}

			{mentorCheck && isHovered && !hasEvent && (
				<button //멘토인지 멘티인지에 대한 여부에 따라 classname 변경: 멘티면 호버 안되게끔 수정
					className={`hover-button absolute top-0 right-0  bg-blue-500 text-white rounded-full w-6 h-6`}
					onClick={(e) => onClickAddEventHandler(e, formatDate)}
				>
					+
				</button>
			)}
		</div>
	);
};

export default DayCellContent;
