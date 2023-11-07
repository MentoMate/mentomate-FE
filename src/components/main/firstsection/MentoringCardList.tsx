import { IMentoringCard } from "@/interface/mainPageMentoringCard";
import MentoringCard from "../MentoringCard";
import { Link } from "react-router-dom";

export interface IMentoringProps {
	data: IMentoringCard[];
}

const CardList = ({ data }: IMentoringProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentoringCard, index: number) => (
				<Link key={index} to={`/mentoringDetail/${card.mentoringId}`}>
					<MentoringCard mentoringcard={card} />
				</Link>
			))}
		</div>
	);
};

export default CardList;
