import { categories } from "@/constants/categories";
import { selectedCategoryState } from "@/state/selectedCategory";
import { useRecoilState } from "recoil";
import { ReactComponent as CheckMark } from "@assets/svg/checkmark.svg";
import { IElement } from "@/interface/category";

const SecondStep = () => {
	const [selectedCategory, setSelectedCategory] = useRecoilState(
		selectedCategoryState,
	);

	const selectCategoryHandler = (category: IElement) => {
		setSelectedCategory({
			selectedCategoryType: selectedCategory.selectedCategoryType,
			selectedCategory: category.key,
			selectedCategoryName: category.categoryName,
		});
	};

	return (
		<div className="">
			<div className="mt-2 text-center font-semibold">
				작은 카테고리를 선택하세요
			</div>
			<div className="mt-6 mx-12 h-[27rem] overflow-auto">
				{categories[selectedCategory.selectedCategoryType].map(
					(category: IElement) => (
						<div
							key={category.key}
							className={`flex justify-between items-center mx-2 px-4
               py-2 border-b border-black-200 cursor-pointer ${
									category.key === selectedCategory.selectedCategory
										? "text-main-color font-semibold"
										: "text-black-500"
								}`}
							onClick={() => selectCategoryHandler(category)}
						>
							{category.categoryName}
							{category.key === selectedCategory.selectedCategory && (
								<CheckMark width={10} height={10} className="fill-main-color" />
							)}
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default SecondStep;
