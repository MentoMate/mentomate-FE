import MypageMentoring from "@components/mypage/myPageReview/MypageMentoring";

const MentoringList = ({ data }: any) => {
	if (!data) {
		return null; // 또는 에러 메시지를 반환하거나 다른 처리를 수행할 수 있음
	}
	console.log(data.content);
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				<MypageMentoring />
				<MypageMentoring />
			</div>
		</>
	);
};

export default MentoringList;
