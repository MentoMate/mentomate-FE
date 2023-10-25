import MentoringContent from "./MentoringContent";
import RecommendMentoring from "./RecommendMentoring";
import MentorProfile from "./MentorProfile";
import MentoringInfo from "./MentoringInfo";
import MentoringSidebar from "./MentoringSidebar";

const MentoringDetailContainer = () => {
	return (
		<div className="flex md:flex-row flex-col mx-auto my-16 lg:w-[60rem] md:w-[40rem] w-[20rem]">
			<div>
				<MentoringContent />
				<div className="md:hidden block mt-20 md:mx-0 mx-4 p-4 border border-black-200 rounded-lg">
					<MentoringInfo />
					<MentorProfile />
				</div>
				<RecommendMentoring />
			</div>
			<MentoringSidebar />
		</div>
	);
};

export default MentoringDetailContainer;
