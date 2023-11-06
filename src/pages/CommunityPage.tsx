import Spinner from "@components/common/spinner/Spinner";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import { lazy, Suspense } from "react";

const CommunityContainer = lazy(
	() => import("@/components/community/CommunityContainer"),
);

const CommunityPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<CommunityContainer />
			</Suspense>
			<Footer />
		</>
	);
};

export default CommunityPage;
