import MyPageMentoring from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageMentoring";
import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import { Link } from "react-router-dom";

const UserMyPageMentoringList = ({ data }: IMyMentoringItemProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentorItem: IMyMentoringItem, index) => (
					<Link key={index} to={`/mentoringDetail/${mentorItem.mentoringId}`}>
						<MyPageMentoring mentorItem={mentorItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default UserMyPageMentoringList;
