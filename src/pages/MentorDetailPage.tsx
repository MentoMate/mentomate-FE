import Header from "@components/common/header/Header";
import Footer from "@components/common/footer/Footer";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MentorDetailContainer = lazy(
	() => import("@components/mentorDetail/MentorDetailContainer"),
);

const MentorDetailPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<MentorDetailContainer />
				<Footer />
			</Suspense>
		</>
	);
};

export default MentorDetailPage;
