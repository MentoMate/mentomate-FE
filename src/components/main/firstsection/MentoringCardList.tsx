import { IMentoringCard } from "@/interface/mainPageMentoringCard";
import MentoringCard from "../MentoringCard";
import { Link } from "react-router-dom";

const CardList = ({ data }: { data: IMentoringCard[] }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentoringCard) => (
				<Link
					key={card.mentoringId}
					to={`/mentoringDetail/${card.mentoringId}`}
				>
					<MentoringCard mentoringcard={card} />
				</Link>
			))}
		</div>
	);
};

export default CardList;
