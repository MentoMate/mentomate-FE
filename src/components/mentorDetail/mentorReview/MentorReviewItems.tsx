import { ReactComponent as Star } from "@assets/svg/star.svg";

const MentorReviewItems = () => {
	return (
		<div className="mb-4 p-4 border border-black-200 rounded-md">
			<div className="flex items-center mb-1">
				<Star width={20} height={20} />
				<div className="ml-2 font-semibold">4.9</div>
			</div>
			<div className="lg:w-[17.5rem] md:w-[23rem] w-full md:text-md text-sm review-overflow">
				멘토링을 하고 완벽하게 할 수 있게 되었어요 너무 좋은 멘토링이였습니다.
				다음에 또 하게 될 수 있다면 꼭 참여하고 싶어요 그리고 ......
			</div>
		</div>
	);
};

export default MentorReviewItems;
