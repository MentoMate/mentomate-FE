import { lazy, Suspense } from "react";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
import Spinner from "@components/common/spinner/Spinner";

const Main = lazy(() => import("@/components/main/Main"));

const MainPage = () => {
	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<Main />
			</Suspense>
			<Footer />
		</>
	);
};

export default MainPage;
