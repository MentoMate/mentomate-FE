import Button from "./Button";
import MentorProfile from "../MentorProfile";
import MentoringInfo from "./MentoringInfo";

const MentoringInfoWithApply = () => {
	return (
		<div className="block md:sticky top-[10rem] md:ml-12 md:mx-0 mx-4 lg:w-[16rem] h-[30rem]">
			<div className="px-4 py-4 border border-black-200 rounded-xl">
				<MentoringInfo />
				<MentorProfile />
			</div>
			<Button />
		</div>
	);
};

export default MentoringInfoWithApply;
