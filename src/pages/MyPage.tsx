import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense } from "react";

const MypageContainer = lazy(
	() => import("@components/mypage/MypageContainer"),
);

const Mypage = () => {
	return (
		<div>
			<Header />
			<Suspense fallback={<Spinner />}>
				<MypageContainer />
			</Suspense>
			<Footer />
		</div>
	);
};

export default Mypage;
