import CategoryList from "./CategoryList";
import SelectCategoryType from "./SelectCategoryType";
import TitleBarWithClose from "./TitleBarWithClose";

const CategoryModal = () => {
	return (
		<div className="flex justify-center fixed bottom-0 w-full h-full bg-[rgba(229,229,229,0.5)] overflow-auto z-[100]">
			<div className="fixed top-32 w-full sm:w-[30rem] h-[40rem] bg-white">
				<div className="mx-10">
					<TitleBarWithClose />
					<SelectCategoryType />
					<CategoryList />
				</div>
			</div>
		</div>
	);
};

export default CategoryModal;
