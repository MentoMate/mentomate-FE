import { IPastMentoring } from "@/interface/MentoringDetail";
import PastMentoringItem from "./PastMentoringItem";

interface IProps {
	readonly pastMentoringList: IPastMentoring[];
}

const PastMentoringList = ({ pastMentoringList }: IProps) => {
	return (
		<div className="grid lg:grid-cols-3 grid-cols-1 place-items-center md:mt-6 lg:w-[40rem] md:w-[25rem] w-[17rem]">
			{pastMentoringList.map((pastMentoring: IPastMentoring) => (
				<PastMentoringItem pastMentoring={pastMentoring} />
			))}
		</div>
	);
};

export default PastMentoringList;
