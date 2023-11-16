import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MentorDetailContainer = lazy(
	() => import("@components/mentorDetail/MentorDetailContainer"),
);

const MentorDetailPage = () => {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<MentorDetailContainer />
			</Suspense>
		</>
	);
};

export default MentorDetailPage;
