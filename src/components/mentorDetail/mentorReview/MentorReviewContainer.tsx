import useAxios from "@/hooks/useAxios";
import MentorReviewList from "./MentorReviewList";
import NonExistsReview from "./NonExistsReview";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IReview } from "@/interface/MentoringDetail";

const MentorReviewContainer = () => {
	const { mentorId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const [reviews, setReviews] = useState<IReview[]>([]);

	const getMentorReview = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url: `/mentoring/mentor/review?mentorId=${mentorId}&page=1&pageSize=4&sortBy=latest`,
		});

		if (response) {
			if (response.status === 200) {
				setReviews(response.data.content);
			}
		}
	};

	useEffect(() => {
		getMentorReview();
	}, []);

	return (
		<div className="md:mx-0 mx-4">
			<h2 className="mt-16 md:text-xl text-lg font-bold">
				멘토님은 어땠나요 ?
			</h2>
			{reviews.length === 0 ? (
				<NonExistsReview />
			) : (
				<MentorReviewList reviews={reviews} />
			)}
		</div>
	);
};

export default MentorReviewContainer;
