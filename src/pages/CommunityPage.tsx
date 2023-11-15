import Spinner from "@components/common/spinner/Spinner";
import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";
import { lazy, Suspense, useEffect } from "react";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useRecoilState } from "recoil";
import { openCategoryModalState } from "@/state/openCategoryModal";

const CommunityContainer = lazy(
	() => import("@components/community/CommunityContainer"),
);

const CommunityPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<>
			<Header />
			<Suspense fallback={<Spinner />}>
				<CommunityContainer />
				<Footer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</>
	);
};

export default CommunityPage;
