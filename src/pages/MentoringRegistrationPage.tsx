import CategoryModal from "@components/common/categoryModal/CategoryModal";
import Spinner from "@components/common/spinner/Spinner";
import useCheckAuth from "@/hooks/useCheckAuth";
import { openCategoryModalState } from "@/state/openCategoryModal";
import Header from "@components/common/header/Header";
import { useEffect, lazy, Suspense } from "react";
import { useRecoilState } from "recoil";

const MentoringRegistrationContainer = lazy(
	() =>
		import("@components/mentoringRegistration/MentoringRegistrationContainer"),
);

const MentoringRegistrationPage = () => {
	useCheckAuth("/mentoringRegistration");

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
				<MentoringRegistrationContainer />
			</Suspense>
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringRegistrationPage;
