import MentoringRegistrationContainer from "@/components/mentoringRegistration/MentoringRegistrationContainer";
import useCheckAuth from "@/hooks/useCheckAuth";
import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

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
			<MentoringRegistrationContainer />
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringRegistrationPage;
