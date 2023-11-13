import { useState, ChangeEvent } from "react";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";

const FileUpload = ({ scheduleId }: { scheduleId: number }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const { fetchDataUseAxios } = useAxios();

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.persist();
		if (e.target.files !== null) {
			console.log(e.target.files);
			const file = e.target.files[0];
			setSelectedFile(file);
		}
	};

	const handleUpload = async () => {
		if (selectedFile) {
			if (selectedFile.size >= 500000) {
				alertHandler(
					"error",
					"크기가 500KB 이상인 이미지는 업로드가 불가능합니다.",
				);
				return;
			}
			console.log(selectedFile);
			const formData = new FormData();
			formData.append("file", selectedFile);

			console.log(formData.get("file"));

			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `schedule/${scheduleId}/file`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log(response);

			if (response && response.status === 200) {
				alertHandler("success", "파일 등록이 완료되었습니다.");
			}
			window.location.reload();
		}
	};

	return (
		<div className="relative flex w-[15rem] lg:w-[40rem] mb-3">
			<input
				className="m-0 block w-full min-w-0 flex-auto rounded border border-neutral-300 px-3 py-[0.32rem] text-base file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] cursor-pointer"
				type="file"
				id="formFile"
				onChange={handleFileChange}
			/>
			<button
				onClick={handleUpload}
				className={`absolute text-white font-semibold right-0 top-0 w-[5rem] h-[2.2rem] rounded-r
          ${
						!selectedFile
							? "bg-gray-400 cursor-not-allowed "
							: "bg-main-color hover:bg-main-color-dark cursor-pointer"
					}
          btn btn-primary`}
				disabled={!selectedFile}
			>
				업로드
			</button>
		</div>
	);
};

export default FileUpload;
