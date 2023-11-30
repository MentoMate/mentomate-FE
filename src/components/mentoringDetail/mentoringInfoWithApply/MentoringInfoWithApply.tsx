import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import MentoringInfo from "./MentoringInfo";
import MentorProfile from "../MentorProfile";

const MentoringInfoWithApply = ({ data }: IMentoringDetailProps) => {
	return (
		<div className="block md:sticky bottom-[5rem] lg:ml-8 md:mx-0 mx-4 lg:w-[19rem] h-[40rem]">
			<div className="bg-white px-4 py-4 border border-black-200 rounded-md">
				<MentoringInfo data={data} />
			</div>
			<MentorProfile data={data} />
		</div>
	);
};

export default MentoringInfoWithApply;
