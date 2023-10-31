import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../common/spinner/Loading";
import { useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { alertHandler } from "@/utils/alert";
import { setCookie } from "@/utils/cookies";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/state/loginState";

const KaKaoCallback = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const setLoginState = useSetRecoilState(loginState);
	const { fetchCall } = useFetch();
	const code = new URLSearchParams(location.search).get("code");

	const getToken = async () => {
		const response = await fetchCall(
			`/api/user/login/oauth/callback/kakao?code=${code}`,
			{
				method: "GET",
			},
		);

		if (response && response.status === 200) {
			if (!response.headers.get("isSignUp")) {
				setCookie("accessToken", response.headers.get("Authorization"));
				setCookie(
					"refreshToken",
					response.headers.get("Authorization-refresh"),
				);
				setLoginState(true);
				navigate("/");
			} else {
				navigate("/successSignUp");
			}
		}

		if (response && response.status === 500) {
			alertHandler(
				"warning",
				"서버에 오류가 생겼습니다. 잠시 후에 다시 시도해주세요.",
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

export default KaKaoCallback;
