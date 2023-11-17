import MentoringContainer from "@/components/mentoring/MentoringContainer";
import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const MentoringPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<div className="relative">
			<MentoringContainer />
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentoringPage;
