import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "@assets/svg/mainArrow.svg";

const MypageNoneApplyMentoring = () => {
	return (
		<div className="flex flex-col items-center justify-center items-center mb-6 min-h-[40rem] text-2xl">
			<p className="mb-4">신청한 멘토링이 없습니다.</p>
			<Link to={"/mentoring"}>
				<div className="text-center font-bold lg:text-2xl text-[#ABDEE6] ">
					<div className="flex justify-center items-center ">
						<div className="mr-2 ">멘토링 신청하러 가기</div>
						<Arrow width={20} height={20} />
					</div>
				</div>
			</Link>
		</div>
	);
};

export default MypageNoneApplyMentoring;
