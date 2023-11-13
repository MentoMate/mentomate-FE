import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useState, useEffect } from "react";

const MentoringFileList = ({ scheduleId }: { scheduleId: number }) => {
	const [fileList, setFileList] = useState([]);
	const { fetchDataUseAxios } = useAxios();

	const scheduleReadHandler = async () => {
		try {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "GET",
				url: `mentoring/schedule/${scheduleId}`,
			});
			setFileList(response.data.fileUploadList);
		} catch (error) {
			console.error("Error fetching schedule:", error);
		}
	};

	const deleteFile = async (fileId) => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `schedule/${scheduleId}/file/${fileId}`,
		});
		if (response && response.status === 200) {
			alertHandler("success", "파일 삭제가 완료되었습니다.");
		}
	};

	const downloadFile = (url, filename) => {
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
				setTimeout((_) => {
					window.URL.revokeObjectURL(url);
				}, 60000);
				a.remove();
			})
			.catch((err) => {
				console.error("err: ", err);
			});
	};
	useEffect(() => {
		scheduleReadHandler();
	}, []);
	console.log(fileList);
	return (
		<>
			<div className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[15rem] lg:w-[40rem]">
				<p>파일 리스트</p>
				<ul>
					{fileList.map((file, index) => (
						<>
							<div key={file.fileId} className="flex w-[20rem] justify-between">
								<div>{file.fileName}</div>
								<a
									onClick={() => downloadFile(file.uploadUrl, file.fileName)}
									download={file.fileName}
								>
									다운로드
								</a>
								<div onClick={() => deleteFile(file.fileId)}>파일 삭제</div>
							</div>
						</>
					))}
				</ul>
				<div className="flex w-[20rem] justify-between">
					<div>텍스트.txt</div>
					<a>다운로드</a>
					<div>파일 삭제</div>
				</div>
			</div>
		</>
	);
};

export default MentoringFileList;
