import { categories } from "@/constants/categories";
import { IElement } from "@/interface/category";
import { openCategoryModalState } from "@/state/openCategoryModal";
import { searchCriteria } from "@/state/searchCriteria";
import { selectedCategoryState } from "@/state/selectedCategory";
import { cancelLockScroll } from "@/utils/controlBodyScroll";
import { useRecoilState, useSetRecoilState } from "recoil";

const CategoryList = () => {
	const [categoryState, setSelectedCategory] = useRecoilState(
		selectedCategoryState,
	);
	const [selectedSearchCriteria, setSelectedSearchCriteria] =
		useRecoilState(searchCriteria);

	const setOpenCategoryModalState = useSetRecoilState(openCategoryModalState);

	const onClickCategoryHandler = (category: IElement) => {
		setOpenCategoryModalState(false);
		cancelLockScroll();
		setSelectedCategory({
			selectedCategoryType: categoryState.selectedCategoryType,
			selectedCategory: category.key,
			selectedCategoryName: category.categoryName,
		});
		setSelectedSearchCriteria({
			...selectedSearchCriteria,
			category: category.key,
		});
	};
	return (
		<>
			<div className="mt-3 h-[30rem] overflow-auto">
				{categories[categoryState.selectedCategoryType].map(
					(category: IElement) => (
						<div
							key={category.key}
							className={`py-2 w-full sm:w-[23rem] border-b border-black-200 ${
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
