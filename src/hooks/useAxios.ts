import { alertHandler } from "@/utils/alert";
import { getCookie } from "@/utils/cookies";
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";
import { useEffect, useState } from "react";

interface IErrorStatus {
	[key: number]: string;
}

const errorStatus: IErrorStatus = {
	400: "잘못된 요청입니다. 다시 시도해주세요.",
	401: "인증 실패하였습니다.",
	403: "접근 권한이 없습니다.",
	404: "찾을 수 없는 경로입니다.",
	500: "서버에 오류가 발생하였습니다.",
};

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

	const onResponse = (response: AxiosResponse) => {
		return response;
	};

	const onErrorResponse = (error: AxiosError | Error) => {
		if (axios.isAxiosError(error)) {
			if (error && error.response) {
				alertHandler(
					"error",
					error.response.data
						? error.response?.data
						: errorStatus[error.response.status],
				);
				return;
			}
		}
	};

	// const setUpInterceptors = (axiostInstance: AxiosInstance) => {
	// 	axiostInstance.interceptors.response.use(onResponse, onErrorResponse);
	// };

	const fetchDataUseAxios = async (
		type: string,
		configParams: AxiosRequestConfig,
	) => {
		setIsLoading(true);
		try {
			if (type === "defaultAxios") {
				// setUpInterceptors(defaultAxios);
				const response = await defaultAxios.request(configParams);
				return response;
			}
			if (type === "useTokenAxios") {
				// setUpInterceptors(useTokenAxios);
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

	useEffect(() => {
		console.log(isLoading);
	}, [isLoading]);

	return { isLoading, fetchDataUseAxios };
};

export default useAxios;
