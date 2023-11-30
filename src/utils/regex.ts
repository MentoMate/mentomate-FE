export const checkRegex = (type: string, value: string) => {
	let result = false;

	if (type === "email") {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		result = emailRegex.test(value);
	}

	if (type === "name") {
		const nameRegex = /^[가-힣]{6}$/;
		result = nameRegex.test(value);
	}

	return result;
};
