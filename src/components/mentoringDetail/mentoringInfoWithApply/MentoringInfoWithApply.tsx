import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import MentorProfile from "../MentorProfile";
import Button from "./Button";
import MentoringInfo from "./MentoringInfo";
console.log("asd");
const MentoringInfoWithApply = ({ data }: IMentoringDetailProps) => {
	console.log(data);
	return (
		<div className="block md:sticky top-[10rem] md:ml-12 md:mx-0 mx-4 lg:w-[16rem] h-[30rem]">
			<div className="px-4 py-4 border border-black-200 rounded-xl">
				<MentoringInfo data={data} />
				<MentorProfile data={data} />
			</div>
			<Button data={data} />
		</div>
	);
};

export default MentoringInfoWithApply;
