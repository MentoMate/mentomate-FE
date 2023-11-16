import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MentoringDetailContainer = lazy(
	() => import("@components/mentoringDetail/MentoringDetailContainer"),
);

const MentoringDetailPage = () => {
	return (
		<div>
			<Suspense fallback={<Spinner />}>
				<MentoringDetailContainer />
			</Suspense>
		</div>
	);
};

export default MentoringDetailPage;
