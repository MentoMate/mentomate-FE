import { checkAuthToken } from "@/utils/checkAuthToken";
import { getCookie } from "@/utils/cookies";
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
				checkAuthToken();
				const response = await useTokenAxios.request(configParams);
				return response;
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error);
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
