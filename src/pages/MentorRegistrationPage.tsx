import useCheckAuth from "@/hooks/useCheckAuth";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MentorRegistrationContainer = lazy(
	() => import("@components/mentorRegistration/MentorRegistrationContainer"),
);

const MentorRegistrationPage = () => {
	useCheckAuth("/mentorRegistration");

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<MentorRegistrationContainer />
			</Suspense>
		</>
	);
};

export default MentorRegistrationPage;
