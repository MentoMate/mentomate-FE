import Swal from "sweetalert2";

export const alertHandler = (
	iconType: string,
	msg: string
) => {
export const alertHandler = (iconType: string, msg: string) => {
	if (iconType === "warning") {
		Swal.fire({
			icon: "warning",
			text: msg,
			showCancelButton: false,
			confirmButtonText: "확인",
		});
	}
	if (iconType === "success") {
		Swal.fire({
			icon: "success",
			text: msg,
			showCancelButton: false,
			confirmButtonText: "확인",
		});
	}
	if (iconType === "error") {
		Swal.fire({
			icon: "error",
			text: msg,
			showCancelButton: false,
			confirmButtonText: "확인",
		});
	}
	if (iconType === "info") {
		Swal.fire({
			icon: "info",
			text: msg,
			showCancelButton: false,
			confirmButtonText: "확인",
		});
	}
};
