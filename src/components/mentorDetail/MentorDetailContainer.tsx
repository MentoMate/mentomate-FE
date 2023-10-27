import MentorInfo from "./MentorInfo";
import MentorIntroduce from "./MentorIntroduce";
import MentorReviewContainer from "./mentorReivew/MentorReviewContainer";
import PastMentoringContainer from "./pastMentoring/PastMentoringContainer";

const MentorDetailContainer = () => {
	return (
		<div className="relative flex md:flex-row flex-col mt-16 mx-auto lg:w-[60rem] md:w-[40rem] w-[20rem]">
			<div>
				<div className="md:hidden block md:mb-0 mb-12">
					<MentorInfo />
				</div>
				<MentorIntroduce />
				<MentorReviewContainer />
				<PastMentoringContainer />
			</div>
			<div className="md:block hidden">
				<MentorInfo />
			</div>
		</div>
	);
};

export default MentorDetailContainer;
