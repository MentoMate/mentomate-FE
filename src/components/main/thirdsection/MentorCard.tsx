import { IMentorItem } from "@/interface/mainPageMentor";
import { ReactComponent as Star } from "@assets/svg/star.svg";

interface Iprops {
	mentorcard: IMentorItem;
}

const MentorCard = ({ mentorcard }: Iprops) => {
	console.log(mentorcard);
	return (
		<div className="mt-12 w-[14rem] bg-black-100 rounded-lg">
			<img
				src={mentorcard.uploadUrl}
				alt="asd"
				className="w-full h-[15rem] rounded-t-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2 text-sm font-bold">
				디자인 / 예술
			</div>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">4.9</div>
				</div>
				<div className="ml-3 text-md font-semibold">{mentorcard.name} 멘토</div>
			</div>
			<p className="w-[13rem] h-[3rem] mx-3 mt-2 mb-4 font-semibold title-overflow">
				{mentorcard.introduce
					? mentorcard.introduce.replace(/<\/?[^>]+(>|$)/g, "")
					: ""}
			</p>
		</div>
	);
};

export default MentorCard;
