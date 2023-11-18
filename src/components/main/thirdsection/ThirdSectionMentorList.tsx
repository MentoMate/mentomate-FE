import { IMentorItemInProps } from "@/interface/mainPageInterface";
import { IMentorItem } from "@/interface/mainPageMentor";
import MentorItem from "@components/main/thirdsection/ThirdSectionMentorItem";

const ThirdSectionMentorList = ({ data }: IMentorItemInProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{data.map((card: IMentorItem) => (
				<MentorItem key={card.mentorId} mentorCard={card} />
			))}
		</div>
	);
};

export default ThirdSectionMentorList;
