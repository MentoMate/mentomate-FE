import MypageMentoring from ".//MypageMentoring";

export interface IMentoringProps {
	data: any;
}
const MentoringList = ({ data }: { data: any }) => {
	console.log(data);
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-2">
				{data.map((mentoringItem: any) => (
					<MypageMentoring
						key={mentoringItem.mentoringId}
						mentoringItem={mentoringItem}
					/>
				))}
			</div>
		</>
	);
};

export default MentoringList;
