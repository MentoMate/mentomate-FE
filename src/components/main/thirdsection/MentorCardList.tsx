import { IMentorItem } from "@/interface/mainPageMentor";
import MentorCard from "./MentorCard";

interface Iprops {
	data: IMentorItem[];
}

const CardList = ({ data }: Iprops) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentorItem, index: number) => (
				<MentorCard key={index} mentorcard={card} />
			))}
		</div>
	);
};

export default CardList;
