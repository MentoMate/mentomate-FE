import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const CommunityRegistrationContainer = lazy(
	() =>
		import("@components/communityRegistration/CommunityRegistrationContainer"),
);

const CommunityRegistrationPage = () => {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<CommunityRegistrationContainer />
			</Suspense>
		</>
	);
};

export default CommunityRegistrationPage;
