import MypageMentoring from "@/components/mypage/myPageFavoriteMentoring/MypageMentoring";
import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import { Link } from "react-router-dom";

const MentoringList = ({ data }: IMyMentoringItemProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentorItem: IMyMentoringItem) => (
					<Link
						key={mentorItem.userId}
						to={`/mentorDetail/${mentorItem.userId}`}
					>
						<MypageMentoring mentorItem={mentorItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default MentoringList;
