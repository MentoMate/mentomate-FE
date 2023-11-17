import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import MypageMentoring from "@components/mypage/myPageMain/MypageMentoring";

const MentoringList = ({ data }: IMyMentoringItemProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentoringItem: IMyMentoringItem) => (
					<MypageMentoring mentoringItem={mentoringItem} />
				))}
			</div>
		</>
	);
};

export default MentoringList;
