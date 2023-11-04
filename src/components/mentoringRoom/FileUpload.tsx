import { useState, ChangeEvent } from "react";
const FileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		e.persist();
		if (e.target.files !== null) {
			const file = e.target.files[0];
			setSelectedFile(file);
		}
	};

	const handleUpload = () => {
		if (selectedFile) {
			const formData = new FormData();

			formData.append("fileData", selectedFile); // 파일 데이터를 "fileData" 필드에 추가
			//추가적으로 api 통신을 이용해서 요청하는 데이터 형식에 맞게 보내줌
		}
	};
	return (
		<>
			<form>
				<div className="relative flex w-[15rem] lg:w-[40rem] mb-3">
					<input
						className=" m-0 block w-full min-w-0 flex-auto rounded border  border-neutral-300  px-3 py-[0.32rem] text-base  
            file:-mx-3 file:-my-[0.32rem] file:overflow-hidden  file:border-0 file:border-solid
           file:border-inherit file:px-3 file:py-[0.32rem]   file:[border-inline-end-width:1px]
           file:[margin-inline-end:0.75rem] cursor-pointer "
						type="file"
						id="formFile"
						onChange={handleFileChange}
					/>
					<button
						type="submit"
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
			</form>
		</>
	);
};
export default FileUpload;
