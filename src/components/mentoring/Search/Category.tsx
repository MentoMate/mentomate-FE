import { useRecoilValue, useSetRecoilState } from "recoil";
import { ReactComponent as BottomArrow } from "@assets/svg/bottom_arrow.svg";
import { ReactComponent as CategoryIcon } from "@assets/svg/category.svg";
import { openCategoryModalState } from "@/state/openCategoryModal";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { selectedCategoryState } from "@/state/selectedCategory";

const Category = () => {
	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);
	const categoryState = useRecoilValue(selectedCategoryState);
	const { lockScroll } = useBodyScrollLock();

	const onClickCategoryHandler = () => {
		lockScroll();
		setOpenCategoryModalState(true);
	};

	return (
		<>
			<div
				className="flex items-center sm:mx-2 px-4 py-2 w-[15rem] border rounded-sm"
				onClick={onClickCategoryHandler}
				role="button"
			>
				<CategoryIcon width={35} height={35} />
				<div className="grow ml-2">{categoryState.selectedCategoryName}</div>
				<BottomArrow width={30} height={30} fill="#3C3C3C" />
			</div>
		</>
	);
};

export default Category;
