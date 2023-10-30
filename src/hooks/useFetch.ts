import { useState } from "react";

export const useFetch = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const fetchCall = async (url: string, options: RequestInit | any) => {
		try {
			setIsLoading(true);
			const response = await fetch(url, options);
			return response;
		} catch (error) {
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return { fetchCall, isLoading, isError };
};
