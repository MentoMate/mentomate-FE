import React from "react";
import { IDayCellContentprop } from "@/types/daycellcontentprop";
const DayCellContent: React.FC<IDayCellContentprop> = ({
	arg,
	hoveredDate,
	setHoveredDate,
	events,
	onClickAddEventhandler,
}) => {
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
			{isHovered && !hasEvent && (
				<button
					className="hover-button absolute top-0 right-0  bg-blue-500 text-white rounded-full w-6 h-6 "
					onClick={(e) => onClickAddEventhandler(e, formatDate)}
				>
					+
				</button>
			)}
		</div>
	);
};

export default DayCellContent;
