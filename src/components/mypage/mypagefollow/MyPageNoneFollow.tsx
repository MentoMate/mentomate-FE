import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "@assets/svg/mainArrow.svg";

const MypageNoneFollowMentor = () => {
	return (
		<div className="flex flex-col items-center justify-center items-center mb-6 min-h-[40rem] text-2xl">
			<p className="mb-4">팔로우한 멘토가 없습니다.</p>
			<Link to={"/mentor"}>
				<div className="text-center font-bold lg:text-2xl text-[#ABDEE6] ">
					<div className="flex justify-center items-center ">
						<div className="mr-2 ">팔로우 하러 가기</div>
						<Arrow width={20} height={20} />
					</div>
				</div>
			</Link>
		</div>
	);
};

export default MypageNoneFollowMentor;
