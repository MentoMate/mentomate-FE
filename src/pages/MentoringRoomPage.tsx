import { Suspense, lazy } from "react";
import Header from "@/components/common/header/Header";
import Spinner from "@/components/common/spinner/Spinner";
const MentoringRoom = lazy(
	() => import("@/components/mentoringRoom/MentoringRoom"),
);

const MentoringRoomPage = () => {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Header />
				<MentoringRoom />
			</Suspense>
		</>
	);
};

export default MentoringRoomPage;
