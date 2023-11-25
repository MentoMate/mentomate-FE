import { getCookie, setCookie } from "@/utils/cookies";
import { checkExpireToken } from "@/utils/tokenAndInfo";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";

const useAxios = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const defaultAxios: AxiosInstance = axios.create({
		baseURL: "https://mentormate.site",
	});

	const useTokenAxios: AxiosInstance = axios.create({
		baseURL: "https://mentormate.site",
		headers: {
			Authorization: `Bearer ${getCookie("accessToken")}`,
		},
	});

	const fetchDataUseAxios = async (
		type: string,
		configParams: AxiosRequestConfig,
	) => {
		try {
			setIsLoading(true);
			if (type === "defaultAxios") {
				const response = await defaultAxios.request(configParams);
				return response;
			}
			if (type === "useTokenAxios") {
				const refreshToken = checkExpireToken();

				if (refreshToken === "") {
					const response = await useTokenAxios.request(configParams);
					return response;
				} else {
					const response = await useTokenAxios.request({
						...configParams,
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
					});
					if (
						response.headers.authorization &&
						response.headers["authorization-refresh"]
					) {
						setCookie("accessToken", response.headers.authorization);
						setCookie(
							"refreshToken",
							response.headers["authorization-refresh"],
						);
					}
					return response;
				}
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError: AxiosError = error;
				return axiosError.response;
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, fetchDataUseAxios };
};

export default useAxios;
