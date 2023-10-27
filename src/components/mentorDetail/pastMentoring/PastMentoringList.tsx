import PastMentoringItem from "./PastMentoringItem";

const PastMentoringList = () => {
	return (
		<div className="grid lg:grid-cols-3 grid-cols-1 place-items-center md:mt-6 mb-[10rem]">
			<PastMentoringItem />
			<PastMentoringItem />
			<PastMentoringItem />
		</div>
	);
};

export default PastMentoringList;
