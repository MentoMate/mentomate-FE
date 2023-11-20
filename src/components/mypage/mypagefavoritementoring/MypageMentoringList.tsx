import MypageMentoring from "@/components/mypage/myPageFavoriteMentoring/MypageMentoring";
import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import { Link } from "react-router-dom";

const MentoringList = ({ data }: IMyMentoringItemProps) => {
	//키값 수정
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentorItem: IMyMentoringItem, index) => (
					<Link key={index} to={`/mentoringDetail/${mentorItem.mentoringId}`}>
						<MypageMentoring mentorItem={mentorItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default MentoringList;
