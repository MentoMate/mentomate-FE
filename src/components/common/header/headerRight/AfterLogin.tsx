import { loginState } from "@/state/loginState";
import { removeCookie } from "@/utils/cookies";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import Notification from "./Notification";

const AfterLogin = () => {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);

	const logoutHandler = () => {
		Swal.fire({
			icon: "question",
			text: "로그아웃 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				removeCookie();
				setLoginState(false);
				navigate("/");
			}
		});
	};

	return (
		<>
			<div className="flex justify-center items-center font-semibold">
				<Link to={"/mypage"}>
					<div className="mx-2 text-black-500 hover:text-sky-300">
						마이페이지
					</div>
				</Link>
				<div
					className="mx-2 cursor-pointer text-black-500 hover:text-sky-300"
					onClick={logoutHandler}
				>
					로그아웃
				</div>
				<Notification />
			</div>
		</>
	);
};

export default AfterLogin;
