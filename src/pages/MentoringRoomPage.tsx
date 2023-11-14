import { Suspense, lazy } from "react";
import Header from "@components/common/header/Header";
import Footer from "@components/common/footer/Footer";
import Spinner from "@components/common/spinner/Spinner";
const MentoringRoom = lazy(
	() => import("@components/mentoringRoom/MentoringRoom"),
);

const MentoringRoomPage = () => {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Header />
				<MentoringRoom />
				<Footer />
			</Suspense>
		</>
	);
};

export default MentoringRoomPage;
