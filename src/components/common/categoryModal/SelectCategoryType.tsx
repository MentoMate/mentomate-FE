import { useRecoilState } from "recoil";
import { selectedCategoryState } from "@/state/selectedCategory";

const SelectCategoryType = () => {
	const [categoryState, setCategoryState] = useRecoilState(
		selectedCategoryState,
	);

	const selectCategoryTypeHandler = (categoryType: string) => {
		setCategoryState({
			selectedCategoryType: categoryType,
			selectedCategory: categoryState.selectedCategory,
			selectedCategoryName: categoryState.selectedCategoryName,
		});
	};

	return (
		<div className="flex mt-2">
			<div
				className={`flex items-center mr-4 ${
					categoryState.selectedCategoryType === "all" &&
					"border-b-2 border-main-color text-main-color"
				} font-semibold cursor-pointer`}
				onClick={() => selectCategoryTypeHandler("all")}
			>
				<div>전체</div>
			</div>
			<div
				className={`flex items-center mr-4 ${
					categoryState.selectedCategoryType === "Occupation" &&
					"border-b-2 border-main-color text-main-color"
				} font-semibold cursor-pointer`}
				onClick={() => selectCategoryTypeHandler("Occupation")}
			>
				<div>직업 및 업무분야</div>
			</div>
			<div
				className={`flex items-center ${
					categoryState.selectedCategoryType === "Career" &&
					"border-b-2 border-main-color text-main-color"
				} font-semibold cursor-pointer`}
				onClick={() => selectCategoryTypeHandler("Career")}
			>
				<div>진로</div>
			</div>
		</div>
	);
};

export default SelectCategoryType;
