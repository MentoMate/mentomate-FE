import { useFetch } from "@/hooks/useFetch";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { setCookie } from "@/utils/cookies";
import Loading from "@components/common/spinner/Loading";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

const NaverCallback = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);
	const { fetchCall } = useFetch();

	const getToken = async () => {
		const code = new URLSearchParams(location.search).get("code");

		const response = await fetchCall(
			`/api/user/login/oauth/callback/naver?code=${code}`,
			{
				method: "GET",
			},
		);

		if (response && response.status === 200) {
			setCookie("accessToken", response.headers.get("Authorization"));
			setCookie("refreshToken", response.headers.get("Authorization-refresh"));
			setLoginState(true);

			response.headers.get("isSignUp")
				? navigate("/successSignUp")
				: navigate("/");
		}

		if (response && response.status === 500) {
			alertHandler(
				"warning",
				"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
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
