import MypageMain from "../mypage/mypagemain/MyPageMain";
import Mypageinfo from "./mypageinfo/MypageInfo";
import MypageMyMentoring from "./mypagemymentoring/MypageMyMentoring";
import MypageReview from "./mypagereview/MypageReview";
import MypageAlarm from "./mypagealarm/MypageAlarm";
import MypageFavoriteMentoring from "./mypagefavoritementoring/MypageFavoriteMentoring";
import MypageFollow from "./mypagefollow/MypageFollow";
import MypagePayment from "./mypagepayment/MypagePayment";
import MypageWriting from "./mypagewriting/MypageWriting";
const MypageContent = ({ selectedItem }: any) => {
	return (
		<div className="md:mx-0 mx-4 lg:w-[45rem] md:w-[25rem] w-[17rem] h-full lg:h-[70rem] ">
			<h1 className="mb-6 md:text-2xl text-xl font-bold">
				{selectedItem.label}
			</h1>
			<div className="h-full md:text-base text-sm">
				{selectedItem.label === "마이페이지" && <MypageMain />}
				{selectedItem.label === "회원 정보" && <Mypageinfo />}
				{selectedItem.label === "나의 멘토링" && <MypageMyMentoring />}
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
