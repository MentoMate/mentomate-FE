import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Header from "@components/common/header/Header";
import Spinner from "@components/common/spinner/Spinner";
import { useEffect, Suspense, lazy } from "react";
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
			<Header />
			<Suspense fallback={<Spinner />}>
				<EditMentoringContainer />
				{isOpenCategoryModal && <CategoryModal />}
			</Suspense>
		</>
	);
};

export default MentoringEditPage;
