import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useMemo, ChangeEvent } from "react";
import { IScduleReadModalProps } from "@/types/scdulereadmodalprop";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import Swal from "sweetalert2";
import { useRecoilState } from "recoil";
import { scheduleEditForm } from "@/data/scheduleEditForm";

const ScheduleEdit: React.FC<IScduleReadModalProps> = ({
	eventInfo,
	formattedDate,
}) => {
	const { fetchDataUseAxios } = useAxios();
	const [form, setForm] = useRecoilState(scheduleEditForm);
	const reactQuillRef = useRef<any>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);

	console.log(form);

	useEffect(() => {
		setForm({
			content: eventInfo.extendedProps.content,
			start: formattedDate,
			scheduleId: eventInfo.extendedProps.scheduleId,
			title: eventInfo.title,
			uploadFolder: eventInfo.extendedProps.uploadFolder,
			mentoringId: eventInfo.extendedProps.mentoringId,
		});
	}, []);
	const [descriptionText, setDescriptionText] = useState(
		eventInfo.extendedProps.content,
	);
	const [titleText, setTitleText] = useState(eventInfo.title);
	const [titleLength, setTitleLength] = useState(eventInfo.title.length);
	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		// 제목 입력 필드 값 변경 시 호출되는 함수
		const newValue = e.target.value;
		setTitleText(newValue);
		setTitleLength(newValue.length);
		setForm({
			...form,
			title: newValue,
		});
	};
	const imageArr = new Array();

	if (
		reactQuillRef.current !== null &&
		reactQuillRef.current.editor !== undefined
	) {
		const textEditorContent = reactQuillRef.current.editor.editor.delta.ops;

		for (let element of textEditorContent) {
			if (element.insert.image !== undefined) {
				imageArr.push(element.insert.image);
			}
		}
	}
	console.log(imageArr);
	const onChangeContentHandler = (value: string) => {
		setForm({
			...form,
			content: value,
		});
		setDescriptionText(value);
	};

	const deleteSubmitHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `mentoring/schedule/${eventInfo.extendedProps.scheduleId}`,
		});
		if (response && response.status === 200) {
			alertHandler("success", "일정 삭제가 완료되었습니다.");
		}
		window.location.reload();
	};
	const updateSubmitHandler = async () => {
		const imageArr = new Array();

		if (
			reactQuillRef.current !== null &&
			reactQuillRef.current.editor !== undefined
		) {
			const textEditorContent = reactQuillRef.current.editor.editor.delta.ops;

			for (let element of textEditorContent) {
				if (element.insert.image !== undefined) {
					imageArr.push(element.insert.image);
				}
			}
		}
		console.log(imageArr);
		const data = {
			scheduleId: form.scheduleId,
			mentoringId: form.mentoringId,
			title: form.title,
			content: form.content,
			start: form.start,
			uploadFolder: form.uploadFolder,
			uploadImg: imageArr,
		};
		console.log(data);

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: `mentoring/schedule/`,
			data: data,
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response && response.status === 200) {
			alertHandler("success", "일정 수정이 완료되었습니다.");
		}
	};
	const onDeleteScduleHandler = () => {
		Swal.fire({
			icon: "question",
			text: "일정을 삭제 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteSubmitHandler();
			}
		});
	};
	const onUpdateScduleHandler = () => {
		Swal.fire({
			icon: "question",
			text: "일정을 수정 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				updateSubmitHandler();
			}
		});
	};
	const reactQuillImageHandler = async () => {
		const inputDOM = document.createElement("input");
		inputDOM.setAttribute("type", "file");
		inputDOM.setAttribute("accept", "image/*");
		inputDOM.click();
		inputDOM.addEventListener("change", async () => {
			if (inputDOM.files !== null) {
				try {
					setIsImgUploading(true);

					const file = inputDOM.files[0];
					const imageUrl = await uploadImageHandler(file);
					const editor = reactQuillRef.current.getEditor();
					const range = editor.getSelection();
					editor.insertEmbed(range.index, "image", imageUrl);
				} catch (error) {
					alertHandler(
						"error",
						"이미지 업로드가 실패하였습니다. 다시 시도해주세요.",
					);
				} finally {
					setIsImgUploading(false);
				}
			}
		});
	};
	const uploadImageHandler = async (file: File) => {
		if (file.size >= 500000) {
			alertHandler(
				"error",
				"크기가 500KB 이상인 이미지는 업로드가 불가능합니다.",
			);
			return;
		}

		const formData = new FormData();
		formData.append("img", file);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/upload?key=schedule/${form.uploadFolder}`,
			data: formData,
		});

		if (response && response.status === 200) {
			return response.data;
		} else {
			alertHandler(
				"error",
				"이미지 업로드에 실패하였습니다. 잠시 후에 다시 시도해주세요.",
			);
		}
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
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
				handlers: {
					image: reactQuillImageHandler, //handlers 속성은 특정한 이벤트(예: 이미지 삽입)에 대한 사용자 지정 핸들러 함수를 제공합니다.
				},
			},
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
		<div className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[20rem] lg:w-[40rem]">
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
			<div ref={divRef}>
				<ReactQuill
					value={descriptionText}
					ref={reactQuillRef}
					onChange={(prev) => onChangeContentHandler(prev)}
					modules={modules}
					formats={formats}
					className="h-[5rem] lg:h-[25rem] mb-12 md:h-[15rem] sm:h-[10rem]"
					placeholder="설명"
				/>
			</div>
			<div className="flex justify-between h-[5rem] mt-12">
				<button
					onClick={onUpdateScduleHandler}
					className="h-[3rem] lg:h-[5rem] w-[7rem] lg:w-[19rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg"
				>
					수정하기
				</button>
				<button
					onClick={onDeleteScduleHandler}
					className="h-[3rem] lg:h-[5rem] w-[7rem] lg:w-[19rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg bg-red-100"
				>
					삭제하기
				</button>
			</div>
		</div>
	);
};
export default ScheduleEdit;
