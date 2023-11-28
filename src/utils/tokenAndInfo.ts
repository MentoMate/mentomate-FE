import { AxiosResponse } from "axios";
import { getCookie, setCookie } from "./cookies";

export const successLogin = (response: AxiosResponse) => {
	setCookie("accessToken", response.headers.authorization);
	setCookie("refreshToken", response.headers["authorization-refresh"]);

	let expireTime = new Date();
	expireTime.setMinutes(expireTime.getMinutes() + 30);

	localStorage.setItem("expireTime", String(expireTime));

	localStorage.setItem("userId", response.data.userId);
	localStorage.setItem("nickName", response.data.nickname);
	localStorage.setItem("email", response.data.email);
};

export const checkExpireToken = () => {
	let expireTime: string | Date | null = localStorage.getItem("expireTime");

	if (expireTime) {
		expireTime = new Date(expireTime);
		let nowTime = new Date();

		const diff = Math.floor((expireTime.getTime() - nowTime.getTime()) / 60000);

		if (diff <= 5) {
			return getCookie("refreshToken");
		}
	}

	return "";
};
