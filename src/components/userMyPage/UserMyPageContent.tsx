import UserMyPageMain from "@/components/userMyPage/userMyPageMain/UserMyPageMain";
import UserMyPageInfo from "@/components/userMyPage/userMyPageInfo/UserMyPageInfo";
import UserMyPageMyMentoring from "@/components/userMyPage/userMyPageMyMentoring/UserMyPageMyMentoring";
import UserMyPageReview from "@/components/userMyPage/userMyPageReview/UserMyPageReview";
import UserMyPageAlarm from "@/components/userMyPage/userMyPageAlarm/UserMyPageAlarm";
import UserMyPageFavoriteMentoring from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageFavoriteMentoring";
import UserMyPageFollow from "@/components/userMyPage/userMyPageFollow/UserMyPageFollow";
import UserMyPagePayment from "@/components/userMyPage/userMyPagePayment/UserMyPagePayment";
import UserMyPageWriting from "@/components/userMyPage/userMyPageWriting/UserMyPageWriting";
import UserMyPageApplyMentoring from "@components/userMyPage/userMyPageApplyMentoring/UserMyPageApplyMentoring";

interface ISelectedItem {
	label: string;
	icon: JSX.Element;
}

interface ISelectedItemProps {
	readonly selectedItem: ISelectedItem;
}

const UserMyPageContent = ({ selectedItem }: ISelectedItemProps) => {
	return (
		<div className="md:mx-0 mx-4 lg:w-[45rem] md:w-[25rem] w-[17rem] h-full lg:h-[70rem] ">
			<h1 className="mb-6 md:text-2xl text-xl font-bold">
				{selectedItem.label}
			</h1>
			<div className="h-full md:text-base text-sm">
				{selectedItem.label === "마이페이지" && <UserMyPageMain />}
				{selectedItem.label === "회원 정보" && <UserMyPageInfo />}
				{selectedItem.label === "내가 등록한 멘토링" && (
					<UserMyPageMyMentoring />
				)}
				{selectedItem.label === "내가 신청한 멘토링" && (
					<UserMyPageApplyMentoring />
				)}
				{selectedItem.label === "평점 & 후기" && <UserMyPageReview />}
				{selectedItem.label === "알림" && <UserMyPageAlarm />}
				{selectedItem.label === "찜한 멘토링" && (
					<UserMyPageFavoriteMentoring />
				)}
				{selectedItem.label === "팔로우" && <UserMyPageFollow />}
				{selectedItem.label === "결제 내역" && <UserMyPagePayment />}
				{selectedItem.label === "내가 쓴 글" && <UserMyPageWriting />}
			</div>
		</div>
	);
};

export default UserMyPageContent;
