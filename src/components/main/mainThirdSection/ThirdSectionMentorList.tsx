import { IMentorItemInProps } from "@/interface/mainPageInterface";
import { IMentorItem } from "@/interface/mainPageMentor";
import MentorItem from "@/components/main/mainThirdSection/ThirdSectionMentorItem";
import { Link } from "react-router-dom";

const ThirdSectionMentorList = ({ data }: IMentorItemInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentorItem) => (
				<Link key={card.mentorId} to={`/mentorDetail/${card.mentorId}`}>
					<MentorItem mentorCard={card} />
				</Link>
			))}
		</div>
	);
};

export default ThirdSectionMentorList;
