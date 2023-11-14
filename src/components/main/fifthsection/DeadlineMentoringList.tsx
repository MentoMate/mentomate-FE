import { IMentoringCardInProps } from "@/interface/mainPageInterface";
import { IMentoringCard } from "@/interface/mainPageMentoringCard";
import { Link } from "react-router-dom";
import MentoringCard from "../MentoringCard";

const DeadlineMentoringList = ({ data }: IMentoringCardInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32">
			{data.map((card: IMentoringCard) => (
				<Link
					key={card.mentoringId}
					to={`/mentoringDetail/${card.mentoringId}`}
				>
					<MentoringCard mentoringCard={card} />
				</Link>
			))}
		</div>
	);
};

export default DeadlineMentoringList;
