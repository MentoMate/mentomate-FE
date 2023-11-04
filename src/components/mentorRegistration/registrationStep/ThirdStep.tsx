import { mentorRegistrationForm } from "@/data/mentorRegistrationForm";
import { ChangeEvent, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import { useRecoilState } from "recoil";
import { ReactComponent as NoneProfile } from "@assets/svg/smileFolder.svg";

const ThirdStep = () => {
	const [form, setForm] = useRecoilState(mentorRegistrationForm);
	const [careerYearValue, setCareerYearValue] = useState<string>("");
	const [careerMonthValue, setCareerMonthValue] = useState<string>("");
	const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

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
				// ["image"],
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
			// "image",
			"align",
			"color",
		];
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
						theme="snow"
						modules={modules}
						formats={formats}
						value={form.introduceContent}
						onChange={(prev) => onChangeHandler("introduceContent", prev)}
					/>
				</div>
			</form>
		</div>
	);
};

export default ThirdStep;
