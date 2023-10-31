import MypageMentoring from "./MypageMentoring";

const MentoringList = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				<MypageMentoring />
				<MypageMentoring />
				<MypageMentoring />
			</div>
		</>
	);
};

export default MentoringList;
