import { useState } from "react";
import { ReactComponent as All } from "@assets/svg/all.svg";
import { ReactComponent as Communication } from "@assets/svg/comment.svg";
import { ReactComponent as Promotion } from "@assets/svg/invite.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";

const TABS = [
	{
		key: "all",
		tabName: "전체",
		component: <All width={20} height={20} />,
	},
	{
		key: "communication",
		tabName: "소통해요",
		component: <Communication width={20} height={20} />,
	},
	{
		key: "promotion",
		tabName: "홍보해요",
		component: <Promotion width={20} height={20} />,
	},
	{
		key: "review",
		tabName: "후기남겨요",
		component: <Review width={20} height={20} />,
	},
];

const CommunityTab = () => {
	const [selectedTab, setSelectedTab] = useState<string>(TABS[0].key);

	const selectedTabHandler = (key: string) => {
		setSelectedTab(key);
	};

	return (
		<div className="sticky top-[3.7rem] bg-white border-b border-black-200">
			<div className="mx-auto lg:w-[60rem] md:w-[45rem] sm:w-[40rem] w-[20rem]">
				<div className="flex sm:mx-4">
					{TABS.map((tab) => (
						<div
							className={`flex justify-center items-center sm:px-3 sm:py-4 px-1 py-2 sm:font-semibold font-bold sm:text-base text-[0.8rem] cursor-pointer ${
								selectedTab === tab.key
									? "border-b-2 border-main-color text-main-color"
									: "text-black-600"
							}`}
							onClick={() => selectedTabHandler(tab.key)}
						>
							{tab.component}
							<div className="ml-1">{tab.tabName}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default CommunityTab;
