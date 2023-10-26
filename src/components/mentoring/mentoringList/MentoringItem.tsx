import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";

const MentoringItem = () => {
	return (
		<div className="mt-12 w-[14rem] bg-black-100 rounded-lg duration-100 hover:scale-105">
			<img
				src="src/assets/image/sample.jpg"
				alt="asd"
				className="w-full h-[15rem] rounded-t-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">4.9</div>
				</div>
				<div className="ml-3 text-md font-semibold">김도아 멘토</div>
			</div>
			<p className="w-[13rem] h-[3.5rem] mx-3 mt-2 text-lg font-bold title-overflow">
				치어리더가 되기 위한 준비과정 그리고 노하우
			</p>
			<div className="flex items-center mt-4 ml-3">
				<Calendar width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">
					2023.10.24 ~ 2023.10.31
				</div>
			</div>
			<div className="flex items-center mt-2 ml-3">
				<Cash width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">59,900 ₩</div>
			</div>
			<div className="flex items-center mt-2 mb-4 ml-3">
				<Group width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">6명</div>
			</div>
		</div>
	);
};

export default MentoringItem;
