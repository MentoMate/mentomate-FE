import {
	IMyMentoringItem,
	IMyMentoringItemProps,
} from "@/interface/myPageMyMentoring";
import MyPageMyMentoring from "@components/mypage/myPageApplyMentoring/MyPageMyMentoring";

const MypageApplyMentoringList = ({ data }: IMyMentoringItemProps) => {
	console.log(data);
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentoringItem: IMyMentoringItem) => (
					<MyPageMyMentoring
						key={mentoringItem.mentoringId}
						mentoringItem={mentoringItem}
					/>
				))}
			</div>
		</>
	);
};

export default MypageApplyMentoringList;
