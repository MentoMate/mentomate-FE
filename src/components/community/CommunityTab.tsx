import { useEffect, useState } from "react";
import { ReactComponent as All } from "@assets/svg/all.svg";
import { ReactComponent as Communication } from "@assets/svg/comment.svg";
import { ReactComponent as Promotion } from "@assets/svg/invite.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";
import { ITabs } from "@/types/community";
import { useSetRecoilState } from "recoil";
import { communityTabState } from "@/state/communityTabState";

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
	const setCommuniyLocation = useSetRecoilState(communityTabState);
	const [selectedTab, setSelectedTab] = useState<string>(TABS[0].key);

	const selectedTabHandler = (tab: ITabs) => {
		setSelectedTab(tab.key);
		setCommuniyLocation(tab);
	};

	useEffect(() => {
		setCommuniyLocation({ key: "all", tabName: "전체" });
	}, []);

	return (
		<div className="sticky bg-white border-b border-black-200 z-[44]">
			<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[20rem]">
				<div className="flex sm:mx-4">
					{TABS.map((tab) => (
						<div
							key={tab.key}
							className={`flex justify-center items-center sm:px-3 sm:py-4 px-1 py-2 sm:font-semibold font-bold sm:text-base text-[0.8rem] cursor-pointer ${
								selectedTab === tab.key
									? "border-b-2 border-main-color text-main-color"
									: "text-black-600"
							}`}
							onClick={() => selectedTabHandler(tab)}
						>
							{tab.key === "all" && <All width={20} height={20} />}
							{tab.key === "communication" && (
								<Communication width={20} height={20} />
							)}
							{tab.key === "promotion" && <Promotion width={20} height={20} />}
							{tab.key === "review" && <Review width={20} height={20} />}
							<div className="ml-1">{tab.tabName}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityTab;
