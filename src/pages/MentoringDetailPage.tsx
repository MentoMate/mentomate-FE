import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MentoringDetailContainer = lazy(
	() => import("@components/mentoringDetail/MentoringDetailContainer"),
);

const MentoringDetailPage = () => {
	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<MentoringDetailContainer />
				<Footer />
			</Suspense>
		</div>
	);
};

export default MentoringDetailPage;
