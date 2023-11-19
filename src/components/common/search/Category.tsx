import { openCategoryModalState } from "@/state/openCategoryModal";
import { selectedCategoryState } from "@/state/selectedCategory";
import { lockScroll } from "@/utils/controlBodyScroll";
import { ReactComponent as CategoryIcon } from "@assets/svg/category.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Category = () => {
	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);
	const categoryState = useRecoilValue(selectedCategoryState);

	const onClickCategoryHandler = () => {
		lockScroll();
		setOpenCategoryModalState(true);
	};

	return (
		<>
			<div
				className="grow flex items-center lg:mx-2 sm:mr-1 px-4 md:py-1 py-2 border rounded-[0.3rem] bg-white hover:bg-black-100 transition duration-150"
				onClick={onClickCategoryHandler}
				role="button"
			>
				<CategoryIcon width={20} height={20} />
				<div className="flex text-[0.75rem]">
					<div className="ml-1.5 mr-3 text-black-600">카테고리</div>
					<div className="text-main-color font-semibold">
						{categoryState.selectedCategoryName}
					</div>
				</div>
			</div>
		</>
	);
};

export default Category;
