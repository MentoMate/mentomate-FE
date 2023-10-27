import MentorReviewList from "./MentorReviewList";
import NonExistsReview from "./NonExistsReview";

const MentorReviewContainer = () => {
	const test = 0;

	return (
		<div className="md:mx-0 mx-4">
			<h2 className="mt-16 md:text-xl text-lg font-bold">
				멘토님은 어땠나요 ?
			</h2>
			{test === 0 ? <MentorReviewList /> : <NonExistsReview />}
		</div>
	);
};

export default MentorReviewContainer;
