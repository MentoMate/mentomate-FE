import Swal from "sweetalert2";

const useAlert = () => {
	const alertHandler = (iconType: string, msg: string) => {
		if (iconType === "warning") {
			Swal.fire({
				icon: "warning",
				text: msg,
				showCancelButton: false,
				confirmButtonText: "확인",
			});
		} else if (iconType === "success") {
			Swal.fire({
				icon: "success",
				text: msg,
				showCancelButton: false,
				confirmButtonText: "확인",
			});
		} else if (iconType === "error") {
			Swal.fire({
				icon: "error",
				text: msg,
				showCancelButton: false,
				confirmButtonText: "확인",
			});
		} else if (iconType === "info") {
			Swal.fire({
				icon: "info",
				text: msg,
				showCancelButton: false,
				confirmButtonText: "확인",
			});
		}
	};

	return { alertHandler };
};

export default useAlert;
