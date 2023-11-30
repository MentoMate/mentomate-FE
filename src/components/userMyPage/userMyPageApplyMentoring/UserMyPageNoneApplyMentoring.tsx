import { Link } from "react-router-dom";
import { ReactComponent as Arrow } from "@assets/svg/mainArrowIcon.svg";

const UserMyPageNoneApplyMentoring = () => {
	return (
		<div className="flex flex-col justify-center items-center mb-6 min-h-[20rem] text-2xl">
			<p className="mb-4">신청한 멘토링이 없습니다.</p>
			<Link to={"/mentoring"}>
				<div className="text-center font-bold lg:text-2xl text-main-color ">
					<div className="flex justify-center items-center ">
						<div className="mr-2 ">멘토링 신청하러 가기</div>
						<Arrow width={20} height={20} />
					</div>
				</div>
			</Link>
		</div>
	);
};

export default UserMyPageNoneApplyMentoring;
