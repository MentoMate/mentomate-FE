import Loading from "@components/common/spinner/Loading";
import { lazy, Suspense } from "react";

const EditCommunityContainer = lazy(
	() => import("@components/communityEdit/EditCommunityContainer"),
);

const EditCommunityPage = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<EditCommunityContainer />
			</Suspense>
		</>
	);
};

export default EditCommunityPage;
