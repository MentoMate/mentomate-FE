import { selectedCategoryState } from "@/state/selectedCategory";
import { useRecoilState } from "recoil";

const FirstStep = () => {
	const [selectedCategoryType, setSelectedCategoryType] = useRecoilState(
		selectedCategoryState,
	);

	const onClickTypeHandler = (type: string) => {
		if (selectedCategoryType.selectedCategoryType !== type) {
			setSelectedCategoryType({
				selectedCategoryType: type,
				selectedCategory: "",
				selectedCategoryName: "",
			});
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="mt-2 font-semibold">큰 카테고리를 선택해주세요.</div>
			<div className="flex justify-center mt-12">
				<button
					className={`mx-2 sm:px-8 px-6 py-4 border border-black-200 rounded-sm sm:text-base text-sm ${
						selectedCategoryType.selectedCategoryType === "Occupation"
							? "text-main-color font-bold"
							: "text-black"
					}`}
					onClick={() => onClickTypeHandler("Occupation")}
				>
					직업 및 업무분야
				</button>
				<button
					className={`mx-2 sm:px-8 px-6 py-4 border border-black-200 rounded-sm sm:text-base text-sm ${
						selectedCategoryType.selectedCategoryType === "Career"
							? "text-main-color font-bold"
							: "text-black"
					}`}
					onClick={() => onClickTypeHandler("Career")}
				>
					진로
				</button>
			</div>
		</div>
	);
};

export default FirstStep;
