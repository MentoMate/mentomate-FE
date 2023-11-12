import { lazy, Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import Spinner from "@components/common/spinner/Spinner";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { openCategoryModalState } from "@/state/openCategoryModal";

const MentoringContainer = lazy(
	() => import("@components/mentoring/MentoringContainer"),
);

const MentoringPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<div className="relative">
			<Header />
			<Suspense fallback={<Spinner />}>
				<MentoringContainer />
				<Footer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringPage;
