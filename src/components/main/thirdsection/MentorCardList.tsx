import { IMentorItem } from "@/interface/mainPageMentor";
import MentorCard from "./MentorCard";

const CardList = ({ data }: { data: IMentorItem[] }) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentorItem) => (
				<MentorCard key={card.mentorId} mentorcard={card} />
			))}
		</div>
	);
};

export default CardList;
