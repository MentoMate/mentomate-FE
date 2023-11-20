import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { scheduleRegistrationForm } from "@/data/scheduleRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";
import Loading from "../common/spinner/Loading";
import ScheduleAddButton from "./ScheduleAddButton";
import { FORMATS } from "@/constants/reactQuill";

interface IScheduleAddModalProps {
	readonly formattedDate: string;
	readonly closeModal: () => void;
	readonly scheduleReadHandler: () => void;
}

const ScheduleAddModal = ({
	formattedDate,
	closeModal,
	scheduleReadHandler,
}: IScheduleAddModalProps) => {
	const [form, setForm] = useRecoilState(scheduleRegistrationForm);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const { fetchDataUseAxios } = useAxios();
	const reactQuillRef = useRef<any>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const scheduleRef = useRef<HTMLDivElement>(null);

	const onChangeContentHandler = (value: string) => {
		setForm({
			...form,
			content: value,
		});
	};

	const makeRandomKeyHandler = async () => {
		const characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let randomKey = "";

		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomKey += characters.charAt(randomIndex);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/upload?key=schedule/${randomKey}`,
		});

		if (response && response.status !== 200) {
			makeRandomKeyHandler();
			return;
		}

		setForm({ ...form, uploadFolder: randomKey });
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

	const imageHandler = async () => {
		const inputDOM = document.createElement("input");
		inputDOM.setAttribute("type", "file");
		inputDOM.setAttribute("accept", "image/*");
		inputDOM.click();
		inputDOM.addEventListener("change", async () => {
			if (inputDOM.files !== null) {
				try {
					setIsImgUploading(true);
					lockScroll();

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
					cancelLockScroll();
				}
			}
		});
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
					[{ align: [] }, { color: [] }],
				],
				handlers: {
					image: imageHandler,
				},
			},
		};
	}, []);

	const onClickCloseBtnHandler = (e: Event) => {
		setForm({
			title: "",
			content: "",
			start: "",
			mentoringId: 0,
			uploadFolder: "",
		});
		cancelLockScroll();
		closeModal();
		e.stopPropagation();
	};

	useEffect(() => {
		setForm({
			title: "",
			content: "",
			start: "",
			uploadFolder: "",
			mentoringId: 0,
		});
		makeRandomKeyHandler();
	}, []);

	useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollIntoView({
				behavior: "instant",
				block: "start",
				inline: "end",
			});
		}
	}, [form.content]);

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				scheduleRef.current &&
				!scheduleRef.current.contains(e.target as Node)
			) {
				cancelLockScroll();
				closeModal();
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [scheduleRef]);

	return (
		<>
			<div className="fixed inset-0 flex items-center  justify-center z-[100] ">
				<div className="absolute inset-0 bg-black opacity-50 " />
				<div ref={scheduleRef} className="z-10 bg-white p-8 rounded-lg mt-20 ">
					<div className="flex justify-between items-center  w-[15rem] lg:w-[40rem]">
						<h2 className="text-sm lg:text-lg font-semibold mb-2">일정 추가</h2>
						<Close
							className="cursor-pointer"
							onClick={() => onClickCloseBtnHandler}
							width={20}
							height={20}
						/>
					</div>

					<div className="font-semibold mt-4 text-sm lg:text-lg ">
						날짜: {formattedDate}
					</div>
					<div className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[15rem] lg:w-[40rem]">
						<input
							type="text"
							className="my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="제목을 입력해주세요"
							onChange={(e) =>
								setForm({
									...form,
									start: formattedDate,
									title: e.target.value,
								})
							}
						/>
						<div ref={divRef}>
							<ReactQuill
								ref={reactQuillRef}
								modules={modules}
								formats={FORMATS}
								onChange={(prev) => onChangeContentHandler(prev)}
								className="h-[5rem] lg:h-[25rem] mb-12 sm:h-[10rem]"
								placeholder="설명"
							/>
						</div>
						<div className="flex justify-between  mt-12 lg:mt-4">
							<ScheduleAddButton
								reactQuillRef={reactQuillRef}
								scheduleReadHandler={scheduleReadHandler}
							/>
						</div>
						{isImgUploading && <Loading />}
					</div>
				</div>
			</div>
		</>
	);
};
export default ScheduleAddModal;
