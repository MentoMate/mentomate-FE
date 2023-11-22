import { IReview } from "@/interface/MentoringDetail";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { Link } from "react-router-dom";

interface IProps {
	readonly review: IReview;
}

const MentorReviewItems = ({ review }: IProps) => {
	return (
		<Link
			to={`/communityDetail/${review.mentoringId}`}
			className="mb-4 p-4 border border-black-200 rounded-md"
		>
			<div className="flex items-center mb-1">
				<Star width={20} height={20} />
				<div className="ml-2 font-semibold">{review.rating}</div>
			</div>
			<div className="lg:w-[17.5rem] md:w-[23rem] w-full md:text-md text-sm review-overflow">
				{review.comment}
			</div>
		</Link>
	);
};

export default MentorReviewItems;
