import { useCallback } from "react";

const useBodyScrollLock = () => {
	const lockScroll = useCallback(() => {
		document.body.style.overflow = "hidden";
	}, []);

	const cancelLockScroll = useCallback(() => {
		document.body.style.overflow = "auto";
	}, []);

	return { lockScroll, cancelLockScroll };
};

export default useBodyScrollLock;
