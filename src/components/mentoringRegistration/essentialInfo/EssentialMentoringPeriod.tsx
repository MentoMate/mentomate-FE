import { mentoringRegistrationForm } from "@/data/mentoringRegistrationForm";
import { alertHandler } from "@/utils/alert";
import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Tidle } from "@assets/svg/tidle.svg";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";

const MentoringPeriod = () => {
	const [form, setForm] = useRecoilState(mentoringRegistrationForm);

	const onChangeDateHandler = (type: string, date: Date) => {
		if (type === "startDate") {
			const today = new Date();
			if (today > date) {
				alertHandler("error", "오늘날짜보다 더 빨리 시작할 수 없습니다.");
				return;
			}

			setForm({
				...form,
				startDate: date,
			});
		}

		if (type === "endDate") {
			console.log(form.startDate);
			console.log(date);
			if (date < form.startDate) {
				alertHandler("error", "종료일자는 시작일자보다 빠를 수 없습니다.");
				return;
			}

			if (date === form.startDate) {
				alertHandler("error", "시작일자와 종료일자가 같을 수 없습니다.");
				return;
			}

			setForm({
				...form,
				endDate: date,
			});
		}
	};

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
						selected={form.startDate}
						dateFormat={"yyyy년 MM월 dd일"}
						onChange={(date) => {
							if (date) {
								onChangeDateHandler("startDate", date);
							}
						}}
						placeholderText="날짜를 선택해주세요"
						className="px-4 py-2 w-[15rem] border rounded-sm outline-main-color text-center"
					/>
				</div>
				<Tidle width={20} height={20} className="mx-2 lg:my-0 my-2" />
				<div>
					<DatePicker
						locale={ko}
						selected={form.endDate}
						dateFormat={"yyyy년 MM월 dd일"}
						onChange={(date) => {
							if (date) {
								onChangeDateHandler("endDate", date);
							}
						}}
						placeholderText="날짜를 선택해주세요"
						className="px-4 py-2 w-[15rem] border rounded-sm outline-main-color text-center"
					/>
				</div>
			</div>
		</div>
	);
};

export default MentoringPeriod;
