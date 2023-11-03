import { loginState } from "@/state/loginState";
import { removeCookie } from "@/utils/cookies";
import { ReactComponent as Alert } from "@assets/svg/alert.svg";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AfterLogin = () => {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);

	const logout = () => {
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
		<div className="flex justify-center items-center font-semibold">
			<Link to={"/mypage"}>
				<div className="mx-2">마이페이지</div>
			</Link>
			<div className="mx-2 cursor-pointer" onClick={logout}>
				로그아웃
			</div>
			<div className="relative px-2">
				<Alert width={25} />
				<div className="absolute top-[-0.6rem] right-0 w-6 h-6 bg-red-100 rounded-2xl text-center text-white text-sm">
					0
				</div>
			</div>
		</div>
	);
};

export default AfterLogin;
