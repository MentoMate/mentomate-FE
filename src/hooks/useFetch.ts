import { useState } from "react";

type RequestOption = {
	method: string;
	body: any;
};

export const useFetch = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async (url: string, options: RequestOption) => {
		try {
			setLoading(true);
			const response = await fetch(url, options);
			console.log(response);
		} catch (error) {
			throw new Error();
		} finally {
			setLoading(false);
		}
	};

	return { fetchData, loading };
};
