import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Spinner from "@components/common/spinner/Spinner";
import { Suspense, lazy, useEffect } from "react";
import { useRecoilState } from "recoil";

const EditMentoringContainer = lazy(
	() => import("@components/mentoringEdit/EditMentoringContainer"),
);

const MentoringEditPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<>
			<Suspense fallback={<Spinner />}>
				<EditMentoringContainer />
				{isOpenCategoryModal && <CategoryModal />}
			</Suspense>
		</>
	);
};

export default MentoringEditPage;
