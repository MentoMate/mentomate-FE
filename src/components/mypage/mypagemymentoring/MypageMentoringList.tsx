import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import MypageMentoring from "@components/mypage/myPageMyMentoring/MypageMentoring";
import { Link } from "react-router-dom";

const MentoringList = ({ data }: IMyMentoringItemProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentoringItem: IMyMentoringItem) => (
					<Link
						key={mentoringItem.mentoringId}
						to={{
							pathname: `/mentoringRoom/${mentoringItem.mentoringId}/${mentoringItem.startDate}/${mentoringItem.endDate}`,
							search: `?startDate=${mentoringItem.startDate}&endDate=${mentoringItem.endDate}`,
						}}
					>
						<MypageMentoring mentoringItem={mentoringItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default MentoringList;
