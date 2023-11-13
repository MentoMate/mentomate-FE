import Header from "@/components/common/header/Header";
import Loading from "@/components/common/spinner/Loading";
import { lazy, Suspense } from "react";

const EditCommunityContainer = lazy(
	() => import("@components/communityEdit/EditCommunityContainer"),
);

const EditCommunityPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Loading />}>
				<EditCommunityContainer />
			</Suspense>
		</>
	);
};

export default EditCommunityPage;
