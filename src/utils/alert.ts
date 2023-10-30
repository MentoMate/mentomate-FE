import Swal from "sweetalert2";

export const alertHandler = (
	iconType: string,
	msg: string,
	url: string = "",
) => {
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
	if (iconType === "confirm") {
		let confirm = false;
		Swal.fire({
			icon: "question",
			text: msg,
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				confirm = true;
			}
		});
		return confirm;
	}
};
