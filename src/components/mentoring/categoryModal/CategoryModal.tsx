import CategoryList from "./CategoryList";
import SelectCategoryType from "./SelectCategoryType";
import CategoryTopBar from "./TitleBarWithClose";

const CategoryModal = () => {
	return (
		<div className="absolute flex justify-center items-center top-0 w-screen h-screen bg-[rgba(229,229,229,0.5)]">
			<div className="w-[30rem] h-[40rem] bg-white">
				<div className="ml-10">
					<CategoryTopBar />
					<SelectCategoryType />
					<CategoryList />
				</div>
			</div>
		</div>
	);
};

export default CategoryModal;
