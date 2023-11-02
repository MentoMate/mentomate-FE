import { IMentoringDetailProps } from "@/interface/mentoringDetailInfo";
import MentorProfile from "../MentorProfile";
import Button from "./Button";
import MentoringInfo from "./MentoringInfo";

const MentoringInfoWithApply = ({ data }: IMentoringDetailProps) => {
	// TODO: 멘토링 상세조회 멘토 정보 오면 진행
	return (
		<div className="block md:sticky top-[10rem] md:ml-12 md:mx-0 mx-4 lg:w-[16rem] h-[30rem]">
			<div className="px-4 py-4 border border-black-200 rounded-xl">
				<MentoringInfo data={data} />
				<MentorProfile />
			</div>
			<Button />
		</div>
	);
};

export default MentoringInfoWithApply;
