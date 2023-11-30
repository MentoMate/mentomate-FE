import { useState, ChangeEvent } from "react";

const useInput = (initialValue: string) => {
	const [value, setValue] = useState<string>(initialValue);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement> | string) => {
		if (typeof e === "string") {
			setValue(e);
		} else {
			setValue(e.target.value);
		}
	};

	return [value, onChangeHandler] as const;
};

export default useInput;
