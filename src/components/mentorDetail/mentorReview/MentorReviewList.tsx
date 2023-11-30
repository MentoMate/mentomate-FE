import { IReview } from "@/interface/MentoringDetail";
import MentorReviewItems from "./MentorReviewItems";

interface IProps {
	readonly reviews: IReview[];
}

const MentorReviewList = ({ reviews }: IProps) => {
	return (
		<>
			<div className="grid lg:grid-cols-2 grid-cols-1 place-items-center mt-6 lg:w-[40rem] md:w-[25rem] w-[17rem]">
				{reviews.map((review: IReview) => (
					<MentorReviewItems review={review} />
				))}
			</div>
		</>
	);
};

export default MentorReviewList;
