import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useState, useEffect } from "react";
import { ReactComponent as Download } from "@/assets/svg/download.svg";
import { ReactComponent as Delete } from "@/assets/svg/delete.svg";
import Swal from "sweetalert2";

interface FileData {
	fileId: number;
	fileName: string;
	uploadUrl: string;
}

const MentoringFileList = ({ scheduleId }: { scheduleId: number }) => {
	const [fileList, setFileList] = useState<FileData[]>([]);
	const { fetchDataUseAxios } = useAxios();

	const scheduleReadHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `mentoring/schedule/${scheduleId}`,
		});
		if (response && response.data && response.data.fileUploadList) {
			setFileList(response.data.fileUploadList);
		}
	};

	const deleteFile = async (fileId: number) => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `schedule/${scheduleId}/file/${fileId}`,
		});
		if (response && response.status === 200) {
			alertHandler("success", "파일 삭제가 완료되었습니다.");
		}
		scheduleReadHandler();
	};

	const downloadFile = (url: string, filename: string) => {
		fetch(url, { method: "GET" })
			.then((res) => {
				return res.blob();
			})
			.then((blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = filename;
				document.body.appendChild(a);
				a.click();
				setTimeout(() => {
					window.URL.revokeObjectURL(url);
				}, 60000);
				a.remove();
			})
			.catch((err) => {
				console.error("err: ", err);
			});
	};
	const onClickRegisterHandler = (fileId: number) => {
		Swal.fire({
			icon: "question",
			text: "파일을 삭제하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteFile(fileId);
			}
		});
	};
	useEffect(() => {
		scheduleReadHandler();
	}, []);

	return (
		<>
			<div className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[25rem] lg:w-[40rem] bg-gray-100 rounded-md p-4">
				<p className="mb-4 text-xl font-semibold text-center">파일 리스트</p>

				{fileList.map((file) => (
					<div
						key={file.fileId}
						className="flex items-center justify-between py-2 px-4 bg-white shadow-md rounded-md mb-2"
					>
						<div className="flex-grow">{file.fileName}</div>
						<div className="flex items-center space-x-4">
							<a
								onClick={() => downloadFile(file.uploadUrl, file.fileName)}
								download={file.fileName}
								className="cursor-pointer"
							>
								<Download className="cursor-pointer" width={30} />
							</a>
							<div
								onClick={() => onClickRegisterHandler(file.fileId)}
								className="cursor-pointer"
							>
								<Delete className="cursor-pointer" width={30} />
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default MentoringFileList;
