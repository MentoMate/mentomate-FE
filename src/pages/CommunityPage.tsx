import CommunityContainer from "@/components/community/CommunityContainer";
import { openCategoryModalState } from "@/state/openCategoryModal";
import CategoryModal from "@components/common/categoryModal/CategoryModal";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const CommunityPage = () => {
	const [isOpenCategoryModal, setIsOpenCategoryModal] = useRecoilState(
		openCategoryModalState,
	);

	useEffect(() => {
		setIsOpenCategoryModal(false);
	}, []);

	return (
		<>
			<CommunityContainer />
			{isOpenCategoryModal && <CategoryModal />}
		</>
	);
};

export default CommunityPage;
