import { useState, ChangeEvent } from "react";

const useInput = (initialValue: string | null) => {
	const [value, setValue] = useState<string | null>(initialValue);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return [value, onChangeHandler];
};

export default useInput;
