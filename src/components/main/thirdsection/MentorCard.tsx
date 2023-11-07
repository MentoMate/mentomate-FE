import { categories } from "@/constants/categories";
import { IMentorItem } from "@/interface/mainPageMentor";
import { ReactComponent as Star } from "@assets/svg/star.svg";

interface Iprops {
	mentorcard: IMentorItem;
}

const MentorCard = ({ mentorcard }: Iprops) => {
	const mainCategory = mentorcard.mainCategory; // 예시 mainCategory
	const middleCategory = mentorcard.middleCategory; // 예시 middleCategory

	function getCategoryName(
		mainCategory: string | null,
		middleCategory: string | null,
	) {
		if (!mainCategory || !middleCategory) {
			return "없음";
		} else {
			const categoryData = categories[mainCategory];

			if (categoryData) {
				const category = categoryData.find(
					(item) => item.key === middleCategory,
				);
				return category ? category.categoryName : "없음";
			} else {
				return "없음";
			}
		}
	}

	const categoryName = getCategoryName(mainCategory, middleCategory);

	return (
		<div className="mt-12 w-[14rem] bg-black-100 rounded-lg">
			<img
				src={mentorcard.uploadUrl}
				alt="asd"
				className="w-full h-[15rem] rounded-t-lg object-cover"
			/>
			<div className="flex justify-center items-center mt-2 text-sm font-bold">
				{categoryName}
			</div>
			<div className="flex justify-center items-center mt-2">
				<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
					<Star width={20} height={20} className="mr-1" />
					<div className="font-semibold text-sm">
						{mentorcard.rating ? mentorcard.rating : "0"}
					</div>
				</div>
				<div className="ml-3 text-md font-semibold">{mentorcard.name} 멘토</div>
			</div>
			<p className="w-[13rem] h-[3rem] mx-3 mt-2 mb-4 font-semibold title-overflow">
				{mentorcard.introduce
					? mentorcard.introduce.replace(/<\/?[^>]+(>|$)/g, "")
					: ""}
			</p>
		</div>
	);
};

export default MentorCard;
