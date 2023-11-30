import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import { ReactComponent as Category } from "@assets/svg/category.svg";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";

const COMMUNITY_TYPES = [
	{
		value: "communication",
		name: "소통해요",
	},
	{
		value: "promotion",
		name: "홍보해요",
	},
	{
		value: "review",
		name: "후기남겨요",
	},
];

const ChoiceCommunityType = () => {
	const [form, setForm] = useRecoilState(communityRegistrationForm);

	const onChangeCommunityType = (e: ChangeEvent<HTMLSelectElement>) => {
		setForm({ ...form, category: e.target.value });
	};

	return (
		<div className="flex sm:flex-row flex-col lg:text-lg md:text-base text-sm">
			<label htmlFor="categoryType" className="flex items-center">
				<Category width={25} height={25} className="mr-2" />
				<span className="w-[7rem] font-bold ">커뮤니티 메뉴</span>
			</label>
			<select
				name="categoryType"
				id="categoryType"
				className="sm:mt-0 mt-2 p-2 sm:w-[10rem] border outline-none rounded-md"
				onChange={onChangeCommunityType}
			>
				{COMMUNITY_TYPES.map((type) => (
					<option value={type.value}>{type.name}</option>
				))}
			</select>
		</div>
	);
};

export default ChoiceCommunityType;
