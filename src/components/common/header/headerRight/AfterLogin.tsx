import useLogout from "@/hooks/useLogout";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const AfterLogin = () => {
	const { onClickLogoutBtnHandler } = useLogout();

	return (
		<>
			<div className="flex justify-center items-center font-semibold">
				<Link to={"/userMyPage"}>
					<div className="mx-2 text-white hover:text-black-200">마이페이지</div>
				</Link>
				<div
					className="mx-2 cursor-pointer text-white hover:text-black-200"
					onClick={onClickLogoutBtnHandler}
				>
					로그아웃
				</div>
				<Notification />
			</div>
		</>
	);
};

export default AfterLogin;
