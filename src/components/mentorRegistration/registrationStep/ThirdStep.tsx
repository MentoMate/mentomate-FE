import { mentorRegistrationForm } from "@/data/mentorRegistrationForm";
import { ChangeEvent, useMemo, useState, useRef } from "react";
import ReactQuill from "react-quill";
import { useRecoilState } from "recoil";
import { ReactComponent as NoneProfile } from "@assets/svg/smileFolder.svg";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { FORMATS } from "@/constants/reactQuill";

interface IProps {
	readonly reactQuillRef: any;
}

const ThirdStep = ({ reactQuillRef }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const [form, setForm] = useRecoilState(mentorRegistrationForm);
	const [careerYearValue, setCareerYearValue] = useState<string>("");
	const [careerMonthValue, setCareerMonthValue] = useState<string>("");
	const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);
	const [isImgUploading, setIsImgUploading] = useState<boolean>(false);

	const makePreviewImgHandler = (thumbNailImgFile: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(thumbNailImgFile);

		reader.onload = (e) => {
			if (e.target !== null) {
				setPreviewImg(e.target.result as string);
			}
		};
	};

	const onChangeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			if (e.currentTarget.files.length === 0) return;

			const profileImgFile = e.currentTarget.files[0];
			makePreviewImgHandler(profileImgFile);

			if (profileImgFile) {
				setForm({
					...form,
					img: profileImgFile,
				});
			}
		}
	};

	const onChangeHandler = (
		type: string,
		e: ChangeEvent<HTMLInputElement> | string,
	) => {
		let value = "";

		if (typeof e === "string") {
			value = e;
		} else {
			value = e.target.value;
		}

		if (type === "name") {
			setForm({
				...form,
				name: value,
			});
		}

		if (type === "careerYear") {
			if (value.length > 2) {
				setCareerYearValue(careerYearValue);
			} else {
				setCareerYearValue(value);
			}

			setForm({
				...form,
				careerYear: Number(value),
			});
		}

		if (type === "careerMonth") {
			if (value.length > 2 || Number(value) > 11) {
				setCareerMonthValue(careerMonthValue);
			} else {
				setCareerMonthValue(value);
			}
			setForm({
				...form,
				careerMonth: Number(value),
			});
		}

		if (type === "introduceContent") {
			setForm({
				...form,
				introduceContent: value,
			});
		}
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
			url: `/upload?key=${form.uploadFolder}`,
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

	// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
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
					image: imageHandler,
				},
			},
		};
	}, []);

	return (
		<div>
			<div className="mt-2 text-center font-semibold">
				필수 정보를 입력해주세요.
			</div>
			<form className="mt-8">
				<div className="sm:flex sm:justify-center sm:items-center">
					<div className="flex justify-center mb-4">
						<label htmlFor="profile">
							<div className="flex justify-center items-center w-[12rem] h-[12rem] bg-black-200 rounded-full cursor-pointer">
								{previewImg ? (
									<img
										src={previewImg}
										className="w-full h-full rounded-full object-fill"
										alt="미리보기"
									/>
								) : (
									<div className="flex flex-col justify-center items-center text-[0.8rem] font-bold text-black-500">
										<NoneProfile className="w-20 h-20 rounded-full" />
										<p>프로필 이미지를 등록하세요</p>
									</div>
								)}
							</div>
							<input
								type="file"
								id="profile"
								className="hidden"
								onChange={onChangeImgHandler}
							/>
						</label>
					</div>
					<div className="ml-8">
						<div className="flex flex-col">
							<label className="mb-2 font-semibold">이름</label>
							<input
								type="text"
								className="px-2 py-1 w-[14rem] border rounded-md outline-main-color"
								onChange={(prev) => onChangeHandler("name", prev)}
							/>
						</div>
						<div className="flex flex-col mt-4">
							<label className="font-semibold">경력</label>
							<div className="flex mt-2">
								<div className="flex items-center">
									<input
										type="number"
										className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color text-right"
										value={careerYearValue}
										onChange={(prev) => onChangeHandler("careerYear", prev)}
									/>
									<div className="ml-1">년</div>
								</div>
								<div className="flex items-center ml-4">
									<input
										type="number"
										className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color text-right"
										value={careerMonthValue}
										onChange={(prev) => onChangeHandler("careerMonth", prev)}
									/>
									<div className="ml-1">개월</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col mt-8">
					<label className="mb-2 font-semibold">멘토소개</label>
					<ReactQuill
						ref={reactQuillRef}
						theme="snow"
						modules={modules}
						formats={FORMATS}
						value={form.introduceContent}
						onChange={(prev) => onChangeHandler("introduceContent", prev)}
					/>
				</div>
			</form>
		</div>
	);
};

export default ThirdStep;
