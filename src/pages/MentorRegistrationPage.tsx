import Spinner from "@components/common/spinner/Spinner";
import Header from "@components/common/header/Header";
import { lazy, Suspense } from "react";
import useCheckAuth from "@/hooks/useCheckAuth";

const MentorRegistrationContainer = lazy(
	() => import("@components/mentorRegistration/MentorRegistrationContainer"),
);

const MentorRegistrationPage = () => {
	useCheckAuth("/mentorRegistration");

	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<MentorRegistrationContainer />
			</Suspense>
		</>
	);
};

export default MentorRegistrationPage;
