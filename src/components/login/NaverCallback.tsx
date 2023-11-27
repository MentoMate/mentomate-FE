import useAxios from "@/hooks/useAxios";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { successLogin } from "@/utils/tokenAndInfo";
import Loading from "@components/common/spinner/Loading";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const NaverCallback = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);
	const { fetchDataUseAxios } = useAxios();

	const getToken = async () => {
		const code = new URLSearchParams(location.search).get("code");

		const response = await fetchDataUseAxios("defaultAxios", {
			url: `/user/login/oauth/callback/naver?code=${code}`,
			method: "GET",
		});

		if (response && response.status === 200) {
			if (!response.headers.isSignUp) {
				successLogin(response);
				setLoginState(true);

				const previousLocation = sessionStorage.getItem("previousLocation");
				previousLocation ? navigate(previousLocation) : navigate("/");
			} else {
				navigate("/successSignUp");
			}
		} else {
			alertHandler(
				"error",
				"서버에 오류가 발생하였습니다. 잠시 후에 시도해주세요.",
			);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<>
			<Loading />
		</>
	);
};

export default NaverCallback;
