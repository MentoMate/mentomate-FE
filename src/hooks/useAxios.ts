import { getCookie } from "@/utils/cookies";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useState } from "react";
console.log("asd");
const useAxios = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const defaultAxios: AxiosInstance = axios.create({
		baseURL: "/api",
	});

	const useTokenAxios: AxiosInstance = axios.create({
		baseURL: "/api",
		headers: {
			Authorization: `Bearer ${getCookie("accessToken")}`,
		},
	});

	const fetchDataUseAxios = async (
		type: string,
		configParams: AxiosRequestConfig,
	) => {
		setIsLoading(true);
		try {
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
