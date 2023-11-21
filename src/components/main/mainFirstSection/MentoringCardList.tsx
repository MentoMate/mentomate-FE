import { IMentoringCard } from "@/interface/mainPageMentoringCard";
import MentoringCard from "../MentoringCard";
import { Link } from "react-router-dom";
import { IMentoringCardInProps } from "@/interface/mainPageInterface";

const CardList = ({ data }: IMentoringCardInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mt-8">
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

export default CardList;
