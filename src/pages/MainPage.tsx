import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const Main = lazy(() => import("@components/main/Main"));

const MainPage = () => {
	return (
		<>
			<Suspense fallback={<Spinner />}>
				<Main />
			</Suspense>
		</>
	);
};

export default MainPage;
