import { useRecoilValue } from "recoil";
import { communityTabState } from "@/state/communityTabState";
import { ReactComponent as Right } from "@assets/svg/right.svg";
import { ReactComponent as All } from "@assets/svg/all.svg";
import { ReactComponent as Communication } from "@assets/svg/comment.svg";
import { ReactComponent as Promotion } from "@assets/svg/invite.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";
import { Link } from "react-router-dom";

const LocationWithCreate = () => {
	const selectedTab = useRecoilValue(communityTabState);

	return (
		<div className="flex justify-between items-center mt-8 mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[30rem] w-[20rem]">
			<div className="flex items-center mx-8 font-bold sm:text-lg text-base">
				<div className="mx-1">커뮤니티</div>
				<Right width={12} height={12} className="mt-0.5 mx-1" />
				<div className="flex items-center mx-1">
					{selectedTab.key === "all" && (
						<All width={20} height={20} className="mr-1" />
					)}
					{selectedTab.key === "communication" && (
						<Communication width={20} height={20} className="mr-1" />
					)}
					{selectedTab.key === "promotion" && (
						<Promotion width={20} height={20} className="mr-1" />
					)}
					{selectedTab.key === "review" && (
						<Review width={20} height={20} className="mr-1" />
					)}
					{selectedTab.tabName}
				</div>
			</div>
			<Link
				to="/communityRegistration"
				className="mx-2 px-4 py-3 bg-main-color rounded-md font-semibold text-white"
			>
				글쓰기
			</Link>
		</div>
	);
};

export default LocationWithCreate;
