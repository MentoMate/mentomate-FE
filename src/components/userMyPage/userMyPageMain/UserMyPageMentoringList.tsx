import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import UserMyPageMentoring from "@/components/userMyPage/userMyPageMain/UserMyPageMentoring";
import { Link } from "react-router-dom";

const UserMyPageMentoringList = ({ data }: IMyMentoringItemProps) => {
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
						<UserMyPageMentoring mentoringItem={mentoringItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default UserMyPageMentoringList;
