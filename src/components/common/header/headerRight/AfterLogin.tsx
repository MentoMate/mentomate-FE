import { loginState } from "@/state/loginState";
import { removeCookie } from "@/utils/cookies";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Swal from "sweetalert2";
import Notification from "./Notification";
import useAxios from "@/hooks/useAxios";
import { notificationEmitterId } from "@/state/notification";

const AfterLogin = () => {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);
	const { fetchDataUseAxios } = useAxios();
	const emitterId = useRecoilValue(notificationEmitterId);

	const logoutHandler = async () => {
		await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `/emitter?emitterId=${emitterId}`,
		});

		removeCookie();
		setLoginState(false);
		navigate("/");
	};

	const onClickLogoutBtnHandler = () => {
		Swal.fire({
			icon: "question",
			text: "로그아웃 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				logoutHandler();
			}
		});
	};

	return (
		<>
			<div className="flex justify-center items-center font-semibold">
				<Link to={"/mypage"}>
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
