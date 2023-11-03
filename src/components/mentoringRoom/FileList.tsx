import { useState } from "react";
const FileUpload = () => {
	const [selectedFile, setSelectedFile] = useState(null);

	return (
		<>
			<div className="relative flex w-[15rem] lg:w-[40rem] mb-3">
				<input
					className=" m-0 block w-full min-w-0 flex-auto rounded border  border-neutral-300  px-3 py-[0.32rem] text-base  
            file:-mx-3 file:-my-[0.32rem] file:overflow-hidden  file:border-0 file:border-solid
           file:border-inherit file:px-3 file:py-[0.32rem]   file:[border-inline-end-width:1px]
           file:[margin-inline-end:0.75rem] "
					type="file"
					id="formFile"
				/>
				<button
					className={`absolute text-white font-semibold right-0 top-0 w-[5rem] h-[2.2rem] rounded-r
                 ${
										!selectedFile
											? "bg-gray-400 cursor-not-allowed"
											: "bg-main-color hover:bg-main-color-dark"
									}
                  btn btn-primary`}
					disabled={!selectedFile}
				>
					업로드
				</button>
			</div>
		</>
	);
};
export default FileUpload;
