import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";

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
			<Suspense fallback={<Spinner />}>
				<CommunityContainer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</>
	);
};

export default CommunityPage;
