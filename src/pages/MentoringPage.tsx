import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import { lazy, Suspense } from "react";
import Spinner from "../components/common/spinner/Spinner";
import CategoryModal from "../components/mentoring/categoryModal/CategoryModal";
import { useRecoilValue } from "recoil";
import { openCategoryModalState } from "../state/openCategoryModal";

const Mentoring = lazy(() => import("../components/mentoring/Mentoring"));

const MentoringPage = () => {
	const isOpenCategoryModal = useRecoilValue(openCategoryModalState);

	return (
		<div className="relative">
			<Header />
			<Suspense fallback={<Spinner />}>
				<Mentoring />
			</Suspense>
			<Footer />
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringPage;
