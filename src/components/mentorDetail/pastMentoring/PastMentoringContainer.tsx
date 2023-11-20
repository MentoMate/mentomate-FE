import NonExistsPastMentoring from "./NonExistsPastMentoring";
import PastMentoringList from "./PastMentoringList";

const PastMentoringContainer = () => {
	const test = 1;

	return (
		<div className="md:mx-0 mx-4 mt-16">
			<h2 className="md:text-xl text-lg font-bold">멘토가 진행했던 멘토링</h2>
			{test === 1 ? <PastMentoringList /> : <NonExistsPastMentoring />}
		</div>
	);
};

export default PastMentoringContainer;
