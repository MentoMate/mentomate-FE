export const handlePrevMonth = (
	scheduleDate: { year: number; month: number },
	mentoringPeriod: { startdate: string; enddate: string },
	setScheduleDate: React.Dispatch<
		React.SetStateAction<{ year: number; month: number }>
	>,
	setValidRange: React.Dispatch<
		React.SetStateAction<{ start: string; end: string }>
	>,
) => {
	let prevMonth = scheduleDate.month - 1; //이전 달
	let prevYear = scheduleDate.year; // 다음 달

	if (prevMonth === 0) {
		prevYear -= 1;
		prevMonth = 12;
	}
	const fullDate = mentoringPeriod.startdate; //멘토링 시작기간
	const dateArray = fullDate.split("-"); // [yyyy,mm,dd] 형식

	const startDate = `${prevYear}-${String(prevMonth).padStart(2, "0")}-${
		// 이전달의
		dateArray[1] === String(prevMonth).padStart(2, "0") ? dateArray[2] : "01"
	}`;
	const endOfMonth = new Date(prevYear, prevMonth, 0);

	const endDate = `${prevYear}-${String(prevMonth).padStart(
		2,
		"0",
	)}-${endOfMonth.getDate()}`;

	if (
		startDate >= mentoringPeriod.startdate &&
		endDate <= mentoringPeriod.enddate
	) {
		setScheduleDate({ year: prevYear, month: prevMonth });
		setValidRange({ start: startDate, end: endDate });
	}
};

export const handleNextMonth = (
	scheduleDate: { year: number; month: number },
	mentoringPeriod: { startdate: string; enddate: string },
	setScheduleDate: React.Dispatch<
		React.SetStateAction<{ year: number; month: number }>
	>,
	setValidRange: React.Dispatch<
		React.SetStateAction<{ start: string; end: string }>
	>,
) => {
	let nextMonth = scheduleDate.month + 1;
	let nextYear = scheduleDate.year;

	if (nextMonth === 13) {
		nextYear += 1;
		nextMonth = 1;
	}
	const fullDate = mentoringPeriod.enddate;
	const dateArray = fullDate.split("-");

	const startDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`;
	const endOfMonth = new Date(nextYear, nextMonth, 0);

	const endDate = `${nextYear}-${String(nextMonth).padStart(2, "0")}-${
		mentoringPeriod.enddate ===
		`${nextYear}-${String(nextMonth).padStart(2, "0")}-${dateArray[2]}`
			? dateArray[2]
			: endOfMonth.getDate()
	}`;

	if (
		startDate >= mentoringPeriod.startdate &&
		endDate <= mentoringPeriod.enddate
	) {
		setScheduleDate({ year: nextYear, month: nextMonth });
		setValidRange({ start: startDate, end: endDate });
	}
};
