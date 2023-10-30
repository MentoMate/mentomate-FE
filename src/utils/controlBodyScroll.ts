export const lockScroll = () => {
	document.body.style.overflow = "hidden";
};

export const cancelLockScroll = () => {
	document.body.style.overflow = "auto";
};
