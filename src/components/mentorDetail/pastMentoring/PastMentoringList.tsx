import { IPastMentoring } from "@/interface/MentoringDetail";
import PastMentoringItem from "./PastMentoringItem";

interface IProps {
	readonly pastMentoringList: IPastMentoring[];
}

const PastMentoringList = ({ pastMentoringList }: IProps) => {
	console.log("asd");
	return (
		<div className="grid lg:grid-cols-3 grid-cols-1 place-items-center md:mt-6 mb-[10rem]">
			{pastMentoringList.map((pastMentoring: IPastMentoring) => (
				<PastMentoringItem pastMentoring={pastMentoring} />
			))}
		</div>
	);
};

export default PastMentoringList;
