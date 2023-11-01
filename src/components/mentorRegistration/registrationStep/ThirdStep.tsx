import { mentorRegistrationForm } from "@/data/mentorRegistrationData";
import { ChangeEvent, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRecoilState } from "recoil";

const ThirdStep = () => {
	const [form, setForm] = useRecoilState(mentorRegistrationForm);

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
				name: value,
				careerYear: form.careerYear,
				careerMonth: form.careerMonth,
				introduceContent: form.introduceContent,
			});
		}

		if (type === "careerYear") {
			setForm({
				name: form.name,
				careerYear: Number(value),
				careerMonth: form.careerMonth,
				introduceContent: form.introduceContent,
			});
		}

		if (type === "careerMonth") {
			setForm({
				name: form.name,
				careerYear: form.careerYear,
				careerMonth: Number(value),
				introduceContent: form.introduceContent,
			});
		}

		if (type === "introduceContent") {
			setForm({
				name: form.name,
				careerYear: form.careerYear,
				careerMonth: form.careerMonth,
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
		<div>
			<div className="mt-2 text-center font-semibold">
				필수 정보를 입력해주세요.
			</div>
			<form className="mt-8">
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
					<div className="flex">
						<div className="flex items-center">
							<input
								type="number"
								className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color"
								min="0"
								max="24"
								onChange={(prev) => onChangeHandler("careerYear", prev)}
							/>
							<div className="ml-1">년</div>
						</div>
						<div className="flex items-center ml-4">
							<input
								type="number"
								className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color"
								onChange={(prev) => onChangeHandler("careerMonth", prev)}
							/>
							<div className="ml-1">개월</div>
						</div>
					</div>
					<div className="flex flex-col mt-4">
						<label className="mb-2 font-semibold">멘토소개</label>
						<ReactQuill
							theme="snow"
							modules={modules}
							formats={formats}
							value={form.introduceContent}
							onChange={(prev) => onChangeHandler("introduceContent", prev)}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ThirdStep;
