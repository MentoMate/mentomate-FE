import { IPastMentoring } from "@/interface/MentoringDetail";
import { Link } from "react-router-dom";

interface IProps {
	readonly pastMentoring: IPastMentoring;
}

const PastMentoringItem = ({ pastMentoring }: IProps) => {
	return (
		<Link
			to={`/mentoringDetail/${pastMentoring.mentoringId}`}
			className="md:mt-4 mt-8 w-[12rem]"
		>
			<div className="w-full h-[15rem] object-cover">
				<img
					src={pastMentoring.uploadUrl}
					alt="sample"
					className="w-full h-full"
				/>
			</div>
			<p className="lg:mt-3 mt-1 title-overflow font-semibold">
				{pastMentoring.title}
			</p>
		</Link>
	);
};

export default PastMentoringItem;
