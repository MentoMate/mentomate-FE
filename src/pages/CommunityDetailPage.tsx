import Spinner from "@/components/common/spinner/Spinner";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import { lazy, Suspense } from "react";

const CommunityDetailContainer = lazy(
	() => import("@components/communityDetail/CommunityDetailContainer"),
);

const CommunityDetailPage = () => {
	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<CommunityDetailContainer />
				<Footer />
			</Suspense>
		</div>
	);
};

export default CommunityDetailPage;
