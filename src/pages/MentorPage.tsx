import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Spinner from "@components/common/spinner/Spinner";
import { Suspense, lazy, useEffect } from "react";
import { useRecoilState } from "recoil";

const MentorContainer = lazy(
	() => import("@components/mentor/MentorContainer"),
);

const MentorPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<div className="relative">
			<Suspense fallback={<Spinner />}>
				<MentorContainer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentorPage;
