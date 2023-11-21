import { getCookie } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";

const useAxios = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [config, setConfig] = useState<AxiosRequestConfig | null>(null);

	const defaultAxios: AxiosInstance = axios.create({
		baseURL: "https://mentormate.site",
	});

	const useTokenAxios: AxiosInstance = axios.create({
		baseURL: "https://mentormate.site",
		headers: {
			Authorization: `Bearer ${getCookie("accessToken")}`,
		},
	});

	useTokenAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (err) => {
			if (err.response && err.response.status === 403) {
				const refreshToken = getCookie("refreshToken");
				const newConfig = {
					...config,
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				};
				if (config) {
					const response = await defaultAxios.request(newConfig);
					return response;
				}
			}
		},
	);

	const fetchDataUseAxios = async (
		type: string,
		configParams: AxiosRequestConfig,
	) => {
		setIsLoading(true);
		try {
			setConfig(configParams);
			if (type === "defaultAxios") {
				const response = await defaultAxios.request(configParams);
				return response;
			}
			if (type === "useTokenAxios") {
				const response = await useTokenAxios.request(configParams);
				return response;
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
