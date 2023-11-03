import { useState } from "react";
import ReactQuill from "react-quill";
import { useMemo } from "react";
import { IScduleReadModalProps } from "@/types/scdulereadmodalprop";
const ScduleEdit: React.FC<IScduleReadModalProps> = ({
	formattedDate,
	closeModal,
	eventText,
	eventDescription,
}) => {
	const [descriptionText, setDescriptionText] = useState(eventDescription);
	const [titleText, setTitleText] = useState(eventText);
	const [titleLength, setTitleLength] = useState(eventText.length);
	const onChangeTitleHandler = (e) => {
		// 제목 입력 필드 값 변경 시 호출되는 함수
		const newValue = e.target.value;
		setTitleText(newValue);
		setTitleLength(newValue.length);
	};
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
		<form className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[20rem] lg:w-[40rem]">
			<div className=" flex items-center mt-2 border rounded-md  text-sm mb-4">
				<input
					type="text"
					className="grow px-4 py-4 rounded-md outline-none placeholder:text-black-300"
					placeholder="멘토링 제목을 입력하세요."
					maxLength={50}
					onChange={onChangeTitleHandler}
					value={titleText}
				/>
				<div className="w-[4rem]  text-black-300">{titleLength} / 50</div>
			</div>
			<ReactQuill
				value={descriptionText}
				onChange={setDescriptionText}
				modules={modules}
				formats={formats}
				className="h-[5rem] lg:h-[25rem] mb-12 md:h-[15rem] sm:h-[10rem]"
				placeholder="설명"
			/>
			<div className="flex justify-between h-[5rem] mt-12">
				<button
					type="submit"
					className="h-[3rem] lg:h-[5rem] w-[7rem] lg:w-[19rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg"
				>
					수정하기
				</button>
				<button
					type="submit"
					className="h-[3rem] lg:h-[5rem] w-[7rem] lg:w-[19rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg bg-red-100"
				>
					삭제하기
				</button>
			</div>
		</form>
	);
};
export default ScduleEdit;
