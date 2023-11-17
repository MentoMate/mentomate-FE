import {
	IEndMentoringItem,
	IEndMentoringItemProps,
} from "@/interface/myPageEndMentoring";
import MypageMentoring from "@components/mypage/myPageReview/MypageMentoring";

const MypageMentoringList = ({ data }: IEndMentoringItemProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentoringItem: IEndMentoringItem, index) => (
					<MypageMentoring key={index} mentoringItem={mentoringItem} />
				))}
			</div>
		</>
	);
};

export default MypageMentoringList;
