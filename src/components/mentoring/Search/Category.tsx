import { ReactComponent as CategoryIcon } from "../../../assets/svg/category.svg";
import { ReactComponent as BottomArrow } from "../../../assets/svg/bottom_arrow.svg";

const Category = () => {
	return (
		<>
			<div className="flex items-center mx-2 px-4 py-2 w-[15rem] border rounded-sm">
				<CategoryIcon width={35} height={35} />
				<div className="grow ml-2">서비스기획/UI,UX</div>
				<BottomArrow width={30} height={30} fill="#3C3C3C" />
			</div>
		</>
	);
};

export default Category;
