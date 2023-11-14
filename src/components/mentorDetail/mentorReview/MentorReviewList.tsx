import MentorReviewItems from "./MentorReviewItems";

const MentorReviewList = () => {
	return (
		<>
			<div className="grid lg:grid-cols-2 grid-cols-1 place-items-center mt-6 lg:w-[40rem] md:w-[25rem] w-[17rem]">
				<MentorReviewItems />
				<MentorReviewItems />
				<MentorReviewItems />
				<MentorReviewItems />
			</div>
		</>
	);
};

export default MentorReviewList;
