import { useEffect, useState } from "react";
import { ReactComponent as All } from "@assets/svg/all.svg";
import { ReactComponent as Communication } from "@assets/svg/comment.svg";
import { ReactComponent as Promotion } from "@assets/svg/invite.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";

import { useRecoilState, useSetRecoilState } from "recoil";
import { communityTabState } from "@/state/communityTabState";
import { searchCriteria } from "@/state/searchCriteria";
import { ITabs } from "@/interface/community";
console.log("asd");
const TABS: ITabs[] = [
	{
		key: "all",
		tabName: "전체",
	},
	{
		key: "communication",
		tabName: "소통해요",
	},
	{
		key: "promotion",
		tabName: "홍보해요",
	},
	{
		key: "review",
		tabName: "후기남겨요",
	},
];

const CommunityTab = () => {
	const setCommunityLocation = useSetRecoilState(communityTabState);
	const [selectedTab, setSelectedTab] = useState<string>(TABS[0].key);
	const [selectedSearchCriteria, setSelectedSearchCriteria] =
		useRecoilState(searchCriteria);

	const selectedTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);

		const selectedCategory = tab.key === "all" ? "default" : tab.key;

		setSelectedSearchCriteria({
			...selectedSearchCriteria,
			category: selectedCategory,
		});
		setCommunityLocation(tab);
	};

	useEffect(() => {
		setCommunityLocation({ key: "all", tabName: "전체" });
	}, []);

	return (
		<div className="bg-white border-b border-black-200 z-[44] text-black-500">
			<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[20rem]">
				<div className="flex sm:mx-4">
					{TABS.map((tab) => (
						<div
							key={tab.key}
							className={`flex justify-center items-center sm:px-3 sm:py-4 px-1 py-2 sm:font-semibold font-bold sm:text-base cursor-pointer ${
								selectedTab === tab.key
									? "border-b-2 border-main-color text-main-color"
									: "text-black-500"
							}`}
							onClick={() => selectedTabHandler(tab)}
						>
							{tab.key === "all" && <All width={15} height={15} />}
							{tab.key === "communication" && (
								<Communication width={15} height={15} />
							)}
							{tab.key === "promotion" && <Promotion width={15} height={15} />}
							{tab.key === "review" && <Review width={15} height={15} />}
							<div className="ml-1 hover:text-black-300 text-[0.9rem]">
								{tab.tabName}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityTab;
