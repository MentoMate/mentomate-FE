import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { IMyMentoringItem } from "@/interface/myPageMyMentoring";

interface IProps {
	readonly mentorItem: IMyMentoringItem;
}

const UserMyPageMentoring = ({ mentorItem }: IProps) => {
	return (
		<div className="mt-4 w-[14rem] bg-black-100 rounded-lg duration-100 hover:scale-105">
			<img
				src={mentorItem.uploadUrl}
				alt="asd"
				className="w-full h-[15rem] rounded-t-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">4.9</div>
				</div>
				<div className="ml-3 text-md font-semibold">{mentorItem.name} 멘토</div>
			</div>
			<p className="w-[13rem] h-[3.5rem] mx-3 mt-2 text-lg font-bold title-overflow">
				{mentorItem.title}
			</p>
			<div className="flex items-center mt-4 ml-3">
				<Calendar width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">
					{mentorItem.startDate} ~ {mentorItem.endDate}
				</div>
			</div>
			<div className="flex items-center mt-2 ml-3">
				<Cash width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">{mentorItem.amount} ₩</div>
			</div>
			<div className="flex items-center mt-2 mb-4 ml-3">
				<Group width={23} height={23} />
				<div className="ml-2 font-semibold text-sm">
					{mentorItem.numberOfPeople}명
				</div>
			</div>
		</div>
	);
};

export default UserMyPageMentoring;
