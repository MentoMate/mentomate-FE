import { openCategoryModalState } from "@/state/openCategoryModal";
import { cancelLockScroll } from "@/utils/controlBodyScroll";
import { ReactComponent as CategoryIcon } from "@assets/svg/category.svg";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { useSetRecoilState } from "recoil";

const TitleBarWithClose = () => {
	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);

	const closeCategoryModalHandler = () => {
		cancelLockScroll();
		setOpenCategoryModalState(false);
	};

	return (
		<>
			<div className="flex flex-row-reverse mt-6 mr-10 cursor-pointer">
				<Close width={30} height={30} onClick={closeCategoryModalHandler} />
			</div>
			<div className="flex justify-between">
				<div className="flex">
					<CategoryIcon width={30} height={30} />
					<div className="ml-4 text-xl font-bold">카테고리</div>
				</div>
			</div>
		</>
	);
};

export default TitleBarWithClose;
