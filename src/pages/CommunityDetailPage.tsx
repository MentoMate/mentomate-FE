import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const CommunityDetailContainer = lazy(
	() => import("@components/communityDetail/CommunityDetailContainer"),
);

const CommunityDetailPage = () => {
	return (
		<div>
			<Suspense fallback={<Spinner />}>
				<CommunityDetailContainer />
			</Suspense>
		</div>
	);
};

export default CommunityDetailPage;
