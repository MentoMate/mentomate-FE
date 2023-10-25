import MentoringContent from "./mentoringInfoWithApply/MentoringContent";
import MentoringInfoWithApply from "./mentoringInfoWithApply/MentoringInfoWithApply";
import RecommendMentoring from "./RecommendMentoring";

const MentoringDetailContainer = () => {
	return (
		<div className="flex md:flex-row flex-col mx-auto my-16 lg:w-[60rem] md:w-[40rem] w-[20rem]">
			<div>
				<MentoringContent />
				<div className="md:hidden block mt-20">
					<MentoringInfoWithApply />
				</div>
				<RecommendMentoring />
			</div>
			<MentoringInfoWithApply />
		</div>
	);
};

export default MentoringDetailContainer;
