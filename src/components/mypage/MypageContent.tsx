import MypageMain from "@components/mypage/myPageMain/MyPageMain";
import Mypageinfo from "@components/mypage/myPageInfo/MypageInfo";
import MypageMyMentoring from "@components/mypage/myPageMyMentoring/MypageMyMentoring";
import MypageReview from "@components/mypage/myPageReview/MypageReview";
import MypageAlarm from "@components/mypage/myPageAlarm/MypageAlarm";
import MypageFavoriteMentoring from "@components/mypage/myPageFavoriteMentoring/MypageFavoriteMentoring";
import MypageFollow from "@components/mypage/myPageFollow/MypageFollow";
import MypagePayment from "@components/mypage/myPagePayment/MypagePayment";
import MypageWriting from "@components/mypage/myPageWriting/MypageWriting";
import MypageApplyMentoring from "@components/mypage/myPageApplyMentoring/MyPageApplyMentoring";

interface ISelectedItem {
	label: string;
	icon: JSX.Element;
}

interface ISelectedItemProps {
	readonly selectedItem: ISelectedItem;
}

const MypageContent = ({ selectedItem }: ISelectedItemProps) => {
	return (
		<div className="md:mx-0 mx-4 lg:w-[45rem] md:w-[25rem] w-[17rem] h-full lg:h-[70rem] ">
			<h1 className="mb-6 md:text-2xl text-xl font-bold">
				{selectedItem.label}
			</h1>
			<div className="h-full md:text-base text-sm">
				{selectedItem.label === "마이페이지" && <MypageMain />}
				{selectedItem.label === "회원 정보" && <Mypageinfo />}
				{selectedItem.label === "나의 멘토링" && <MypageMyMentoring />}
				{selectedItem.label === "내가 신청한 멘토링" && (
					<MypageApplyMentoring />
				)}
				{selectedItem.label === "평점 & 후기" && <MypageReview />}
				{selectedItem.label === "알림" && <MypageAlarm />}
				{selectedItem.label === "찜한 멘토링" && <MypageFavoriteMentoring />}
				{selectedItem.label === "팔로우" && <MypageFollow />}
				{selectedItem.label === "결제 내역" && <MypagePayment />}
				{selectedItem.label === "내가 쓴 글" && <MypageWriting />}
			</div>
		</div>
	);
};

export default MypageContent;
