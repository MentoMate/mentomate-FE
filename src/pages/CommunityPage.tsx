import Spinner from "@components/common/spinner/Spinner";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import { lazy, Suspense } from "react";

const CommnunityContainer = lazy(
	() => import("@components/community/CommnunityContainer"),
);

const CommunityPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<CommnunityContainer />
			</Suspense>
			<Footer />
		</>
	);
};

export default CommunityPage;
