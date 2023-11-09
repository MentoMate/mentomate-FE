import { useEffect, useMemo, useRef, useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IScduleAddModalProps } from "@/types/scduleaddmodalprop";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import useAxios from "@/hooks/useAxios";
import { useRecoilState } from "recoil";
import { scheduleRegistrationForm } from "@/data/scheduleRegistrationForm";
import { alertHandler } from "@/utils/alert";

const ScheduleAddModal: React.FC<IScduleAddModalProps> = ({
	formattedDate,
	closeModal,
}) => {
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
	const { fetchDataUseAxios } = useAxios();
	const reactQuillRef = useRef<any>(null);
	const divRef = useRef<HTMLDivElement>(null);
	const [form, setForm] = useRecoilState(scheduleRegistrationForm);

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
					[{ align: [] }, { color: [] }], // dropdown with defaults from theme
				],
				handlers: {
					image: imageHandler, //handlers 속성은 특정한 이벤트(예: 이미지 삽입)에 대한 사용자 지정 핸들러 함수를 제공합니다.
				},
			},
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
	useEffect(() => {
		setForm({
			title: "",
			content: "",
			startDate: "",
			uploadImg: null,
			uploadFolder: "",
			mentoringId: "",
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
	return (
		<>
			<div className="fixed inset-0 flex items-center  justify-center z-20 ">
				<div className="absolute inset-0 bg-black opacity-50 "></div>
				<div className="z-10 bg-white p-8 rounded-lg mt-20 ">
					{/*모달 전체 박스*/}
					<div className="flex justify-between items-center  w-[15rem] lg:w-[40rem]">
						<h2 className="text-sm lg:text-lg font-semibold mb-2">일정 추가</h2>
						<Close
							onClick={() => {
								setForm({
									title: "",
									content: "",
									startDate: "",
									mentoringId: "",
									uploadImg: null,
									uploadFolder: "",
								});
								closeModal(); // 모달 닫기
							}}
							width={20}
							height={20}
						/>
					</div>

					<div className="font-semibold mt-4 text-sm lg:text-lg ">
						날짜: {formattedDate}
					</div>
					<form className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[15rem] lg:w-[40rem]">
						<input
							type="text"
							className="my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="제목을 입력해주세요"
							onChange={(e) =>
								setForm({
									...form,
									startDate: formattedDate,
									title: e.target.value,
								})
							}
						/>
						<div ref={divRef}>
							<ReactQuill
								ref={reactQuillRef}
								modules={modules}
								formats={formats}
								onChange={(prev) => onChangeContentHandler(prev)}
								className="h-[5rem] lg:h-[25rem] mb-12 sm:h-[10rem]"
								placeholder="설명"
							/>
						</div>
						<div className="flex justify-between  mt-12 lg:mt-4">
							<button
								type="submit"
								className="h-[3rem] lg:h-[5rem] w-[15rem] lg:w-[55rem] lg:px-3 lg:py-4 bg-main-color rounded-md font-bold text-white text-lg"
							>
								추가하기
							</button>
						</div>
					</form>

					{/* 모달 내용을 추가하세요 */}
				</div>
			</div>
		</>
	);
};
export default ScheduleAddModal;
