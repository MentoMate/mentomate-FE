import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { lazy, Suspense } from "react";
import Spinner from "../components/common/spinner/Spinner";

const Mentoring = lazy(() => import("../components/mentoring/Mentoring"));

const MentoringPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<Mentoring />
			</Suspense>
			<Footer />
		</>
	);
};

export default MentoringPage;
