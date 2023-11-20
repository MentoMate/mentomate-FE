import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import MyPageMyMentoring from "@components/mypage/myPageApplyMentoring/MyPageMyMentoring";
import { Link } from "react-router-dom";

const MypageApplyMentoringList = ({ data }: IMyMentoringItemProps) => {
	console.log(data);
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
						<MyPageMyMentoring
							key={mentoringItem.mentoringId}
							mentoringItem={mentoringItem}
						/>
					</Link>
				))}
			</div>
		</>
	);
};

export default MypageApplyMentoringList;
