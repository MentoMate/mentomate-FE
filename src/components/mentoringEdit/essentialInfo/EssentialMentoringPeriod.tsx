import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Tidle } from "@assets/svg/tidle.svg";
import { ko } from "date-fns/esm/locale";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MentoringPeriod = () => {
	const [startDate, setStartDate] = useState<Date>(new Date());

	return (
		<div className="flex sm:flex-row flex-col lg:text-lg md:text-base text-sm">
			<div className="flex items-center sm:mb-0 mb-2 lg:w-[10rem] md:w-[8rem] sm:w-[6rem] w-[7rem] font-semibold">
				<Calendar width={25} height={25} className="mr-2" />
				기간
			</div>
			<div className="flex lg:flex-row flex-col items-center lg:grow sm:ml-2">
				<div>
					<DatePicker
						locale={ko}
						selected={startDate}
						onChange={(date) => {
							if (date) {
								setStartDate(date);
							}
						}}
						placeholderText="날짜를 선택해주세요"
						className="px-4 py-2 w-[15rem] border rounded-sm outline-main-color"
					/>
				</div>
				<Tidle width={20} height={20} className="mx-2 lg:my-0 my-2" />
				<div>
					<DatePicker
						locale={ko}
						selected={startDate}
						onChange={(date) => {
							if (date) {
								setStartDate(date);
							}
						}}
						placeholderText="날짜를 선택해주세요"
						className="px-4 py-2 w-[15rem] border rounded-sm outline-main-color"
					/>
				</div>
			</div>
		</div>
	);
};

export default MentoringPeriod;
