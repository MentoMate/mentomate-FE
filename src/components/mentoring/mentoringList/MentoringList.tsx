import MentoringItem from "./MentoringItem";

const MentoringList = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
			</div>
		</>
	);
};

export default MentoringList;
