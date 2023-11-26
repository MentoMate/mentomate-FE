import { useNavigate } from "react-router-dom";
import useAxios from "./useAxios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "@/state/loginState";
import { notificationEmitterId } from "@/state/notification";
import { removeCookie } from "@/utils/cookies";
import Swal from "sweetalert2";

const useLogout = () => {
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

	return { onClickLogoutBtnHandler };
};

export default useLogout;
