import { communityTabState } from "@/state/communityTabState";
import { loginState } from "@/state/loginState";
import { ReactComponent as All } from "@assets/svg/all.svg";
import { ReactComponent as Communication } from "@assets/svg/comment.svg";
import { ReactComponent as Promotion } from "@assets/svg/invite.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";
import { ReactComponent as Right } from "@assets/svg/right.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const LocationWithCreate = () => {
	const selectedTab = useRecoilValue(communityTabState);
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

	const isNotLogin = () => {
		sessionStorage.setItem("previousLocation", "/communityRegistration");
		navigate("/login");
	};

	const registerClickHandler = () => {
		isLogin ? navigate("/communityRegistration") : isNotLogin();
	};

	return (
		<div className="flex justify-between items-center mt-10 mb-4 mx-auto lg:w-[60rem] md:w-[30rem] w-[15rem] text-black-500">
			<div className="flex items-center font-bold">
				<div className="mx-1">커뮤니티</div>
				<Right width={12} height={12} className="mt-0.5 mx-1" />
				<div className="flex items-center mx-1 ">
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
			<button
				onClick={registerClickHandler}
				className="mx-2 p-3 bg-main-color rounded-md font-semibold text-white hover:bg-sky-300"
			>
				게시글쓰기
			</button>
		</div>
	);
};

export default LocationWithCreate;
