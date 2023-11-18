import MentorContainer from "@/components/mentor/MentorContainer";
import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const MentorPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<div className="relative">
			<MentorContainer />
			{isOpenCategoryModal && <CategoryModal />}
		</div>
	);
};

export default MentorPage;
