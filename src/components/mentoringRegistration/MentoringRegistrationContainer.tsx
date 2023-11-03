import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import MentoringTitle from "./MentoringTitle";
import SaveAndBackButton from "./SaveAndBackButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useMemo } from "react";

const MentoringRegistrationContainer = () => {
	const [fileList, setFileList] = useState<FileList | null>(null);

	// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
	const modules = useMemo(() => {
		return {
			toolbar: [
				[{ header: [1, 2, false] }],
				["bold", "italic", "underline"],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["image"],
				[{ align: [] }, { color: [] }], // dropdown with defaults from theme
			],
		};
	}, []);

	//옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼 수 없음
	const formats = useMemo(() => {
		return [
			"header",
			"bold",
			"italic",
			"list",
			"indent",
			"image",
			"align",
			"color",
		];
	}, []);

	return (
		<div className="min-h-screen bg-black-100">
			<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
				<div className="sm:mx-16 mx-4 pt-16">
					<h1 className="font-bold md:text-xl text-lg">멘토링 등록</h1>
					<EssentialInfoContainer setFileList={setFileList} />
					<MentoringTitle />
					<ReactQuill
						className="py-8 rounded-md"
						theme="snow"
						modules={modules}
						formats={formats}
					/>
				</div>
			</div>
			<SaveAndBackButton fileList={fileList} />
		</div>
	);
};

export default MentoringRegistrationContainer;
