import { useState } from "react";
import UserMyPageList from "./UserMyPageList";
import UserMyPageContent from "./UserMyPageContent";
import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as Home } from "@assets/svg/Home.svg";
import { ReactComponent as Group } from "@assets/svg/group.svg";
import { ReactComponent as Review } from "@assets/svg/review.svg";
import { ReactComponent as Alarm } from "@assets/svg/alarm.svg";
import { ReactComponent as MentoringFavorite } from "@assets/svg/myPageMentoringFavorite.svg";
import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";

const UserMyPageContainer = () => {
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);

	const myPageItems = [
		{ label: "마이페이지", icon: <Home width={20} height={20} /> },
		{ label: "회원 정보", icon: <User width={20} height={20} /> },
		{ label: "내가 등록한 멘토링", icon: <Group width={20} height={20} /> },
		{ label: "내가 신청한 멘토링", icon: <Comment width={20} height={20} /> },
		{ label: "평점 & 후기", icon: <Review width={20} height={20} /> },
		{ label: "알림", icon: <Alarm width={20} height={20} /> },
		{
			label: "찜한 멘토링",
			icon: <MentoringFavorite width={20} height={20} />,
		},
		{ label: "팔로우", icon: <EmptyHeart width={20} height={20} /> },
		{ label: "결제 내역", icon: <Cash width={20} height={20} /> },
		{ label: "내가 쓴 글", icon: <Comment width={20} height={20} /> },
	];

	return (
		<>
			<div className="relative flex md:flex-row flex-col mt-16 mx-auto lg:w-[65rem] md:w-[40rem] w-[20rem]">
				<div className="md:flex hidden mr-12">
					<UserMyPageList
						myPageItems={myPageItems}
						selectedItemIndex={selectedItemIndex}
						setSelectedItemIndex={setSelectedItemIndex}
					/>
				</div>
				<div>
					<div className="md:hidden block md:mb-0 mb-4">
						<UserMyPageList
							myPageItems={myPageItems}
							selectedItemIndex={selectedItemIndex}
							setSelectedItemIndex={setSelectedItemIndex}
						/>
					</div>
					<UserMyPageContent selectedItem={myPageItems[selectedItemIndex]} />
				</div>
			</div>
		</>
	);
};

export default UserMyPageContainer;
