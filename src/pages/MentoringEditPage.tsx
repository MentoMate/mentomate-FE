import EditMentoringContainer from "@/components/mentoringEdit/EditMentoringContainer";
import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const MentoringEditPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<>
			<EditMentoringContainer />
			{isOpenCategoryModal && <CategoryModal />}
		</>
	);
};

export default MentoringEditPage;
