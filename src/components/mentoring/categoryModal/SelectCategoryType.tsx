import { useRecoilState } from "recoil";
import { ReactComponent as CheckMark } from "../../../assets/svg/checkmark.svg";
import { selectedCategoryState } from "../../../state/selectedCategory";

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
				{categoryState.selectedCategoryType === "all" && (
					<CheckMark width={10} height={10} fill="#ABDEE6" />
				)}
				<div className="ml-2">전체</div>
			</div>
			<div
				className={`flex items-center mr-4 ${
					categoryState.selectedCategoryType === "Occupation" &&
					"border-b-2 border-main-color text-main-color"
				} font-semibold cursor-pointer`}
				onClick={() => selectCategoryTypeHandler("Occupation")}
			>
				{categoryState.selectedCategoryType === "Occupation" && (
					<CheckMark width={10} height={10} fill="#ABDEE6" />
				)}
				<div className="ml-2">직업 및 업무분야</div>
			</div>
			<div
				className={`flex items-center ${
					categoryState.selectedCategoryType === "Career" &&
					"border-b-2 border-main-color text-main-color"
				} font-semibold cursor-pointer`}
				onClick={() => selectCategoryTypeHandler("Career")}
			>
				{categoryState.selectedCategoryType === "Career" && (
					<CheckMark width={10} height={10} fill="#ABDEE6" />
				)}
				<div className="ml-2">진로</div>
			</div>
		</div>
	);
};

export default SelectCategoryType;
