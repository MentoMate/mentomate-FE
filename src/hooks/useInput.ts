import { useState, ChangeEvent } from "react";

const useInput = (initialValue: string) => {
	const [value, setValue] = useState<string>(initialValue);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return [value, onChangeHandler] as const;
};

export default useInput;
