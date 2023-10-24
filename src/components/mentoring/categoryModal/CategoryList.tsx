import { useRecoilState, useSetRecoilState } from "recoil";
import { categories } from "../../../constants/categories";
import useBodyScrollLock from "../../../hooks/useBodyScrollLock";
import { openCategoryModalState } from "../../../state/openCategoryModal";
import { selectedCategoryState } from "../../../state/selectedCategory";
import { IElement } from "../../../types/categoty";

const CategoryList = () => {
	const [categoryState, setSelectedCategory] = useRecoilState(
		selectedCategoryState,
	);
	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);
	const { cancelLockScroll } = useBodyScrollLock();

	const onClickCategoryHandler = (category: IElement) => {
		setOpenCategoryModalState(false);
		cancelLockScroll();
		setSelectedCategory({
			selectedCategoryType: categoryState.selectedCategoryType,
			selectedCategory: category.key,
			selectedCategoryName: category.categoryName,
		});
	};
	return (
		<>
			<div className="mt-3 h-[30rem] overflow-auto">
				{categories[categoryState.selectedCategoryType].map(
					(category: IElement) => (
						<div
							key={category.key}
							className={`py-2 w-[25rem] border-b border-black-200 ${
								categoryState.selectedCategory === category.key &&
								"text-main-color font-semibold"
							} cursor-pointer`}
							onClick={() => onClickCategoryHandler(category)}
						>
							{category.key === "all" ? "카테고리 전체" : category.categoryName}
						</div>
					),
				)}
			</div>
		</>
	);
};

export default CategoryList;
