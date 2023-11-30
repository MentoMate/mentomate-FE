import axios from "axios";
import { getCookie, setCookie } from "./cookies";

export const checkAuthToken = async () => {
	const accessToken = getCookie("accessToken");
	const refreshToken = getCookie("refreshToken");
	const userEmail = localStorage.getItem("email");

	const response = await axios.get(
		`${import.meta.env.VITE_SERVER_URI}/user/jwt/check?email=${userEmail}`,
		{
			headers: {
				AccessTokenCheck: `Bearer ${accessToken}`,
				RefreshTokenCheck: `Bearer ${refreshToken}`,
			},
		},
	);

	if (response) {
		if (response.data.accessToken) {
			setCookie("accessToken", response.data.accessToken);
		}

		if (response.data.refreshToken) {
			setCookie("refreshToken", response.data.refreshToken);
		}
	}
};
