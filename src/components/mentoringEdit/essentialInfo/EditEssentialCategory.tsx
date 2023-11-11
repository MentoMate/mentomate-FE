import Category from "@/components/common/search/Category";
import { ReactComponent as CategoryIcon } from "@assets/svg/category.svg";

const EditEssentialCategory = () => {
	return (
		<div className="flex sm:flex-row flex-col mt-4 lg:text-lg md:text-base text-sm">
			<div className="flex items-center sm:mb-0 mb-2 lg:w-[10rem] md:w-[8rem] sm:w-[6rem] w-[7.5rem] lg:text-lg md:text-base sm:text-sm font-semibold">
				<CategoryIcon width={25} height={25} className="mr-2" />
				카테고리
			</div>
			<div className="flex items-center grow">
				<div className="flex items-center rounded-md focus:outline-main-color">
					<Category />
				</div>
			</div>
		</div>
	);
};

export default EditEssentialCategory;
