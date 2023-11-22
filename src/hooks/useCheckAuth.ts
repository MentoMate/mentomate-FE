import { loginState } from "@/state/loginState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const URLS = [
	"/mentoringRoom",
	"/mentorRegistration",
	"/mentoringRegistration",
	"/payment",
];

const useCheckAuth = (url: string) => {
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

	const checkUrlAccessAuthorization = () => {
		if (URLS.includes(url)) {
			isLogin ? navigate(url) : navigate("/login");
		}
	};

	useEffect(() => {
		checkUrlAccessAuthorization();
	}, [url]);
};

export default useCheckAuth;
