import MentorProfile from "./MentorProfile";
import MentoringInfo from "./MentoringInfo";

const MentoringSidebar = () => {
	return (
		<div className="hidden md:block md:sticky top-[10rem] ml-12 lg:w-[16rem] h-[30rem]">
			<div className="px-4 py-4 border border-black-200 rounded-xl">
				<MentoringInfo />
				<MentorProfile />
			</div>
			<div className="flex flex-col mt-2">
				<button className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold">
					멘토링 신청
				</button>
				<button className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold">
					1:1 문의
				</button>
			</div>
		</div>
	);
};

export default MentoringSidebar;
