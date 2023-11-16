import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Spinner from "@components/common/spinner/Spinner";
import { lazy, Suspense, useEffect } from "react";
import { useRecoilState } from "recoil";

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
			<Suspense fallback={<Spinner />}>
				<MentoringContainer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringPage;
