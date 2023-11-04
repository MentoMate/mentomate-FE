import { IMentorItem } from "@/interface/mentorItem";
import MentorItem from "./MentorItem";
import { Link } from "react-router-dom";

interface IProps {
	readonly mentorList: IMentorItem[];
}

const MentorList = ({ mentorList }: IProps) => {
	return (
		<div className="mx-2 mt-10">
			<h1 className="text-xl sm:text-2xl font-bold">멘토 목록</h1>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				{mentorList.map((mentorItem: IMentorItem) => (
					<Link
						key={mentorItem.imgUrl + mentorItem.name}
						to={"/mentorDetail/2"}
					>
						<MentorItem
							key={mentorItem.name + mentorItem.imgUrl}
							mentorItem={mentorItem}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default MentorList;
