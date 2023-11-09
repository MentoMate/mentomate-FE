import { mentoringEditForm } from "@/data/mentoringEditForm";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";

const EditMentoringTitle = () => {
	const [form, setForm] = useRecoilState(mentoringEditForm);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, title: e.target.value });
	};

	return (
		<div className="flex items-center mt-4 border rounded-md sm:text-base text-sm">
			<input
				type="text"
				className="grow px-4 py-4 rounded-md outline-none placeholder:text-black-300"
				placeholder="멘토링 제목을 입력하세요."
				maxLength={50}
				defaultValue={form.title}
				onChange={onChangeTitleHandler}
			/>
			<div className="w-[5rem] text-black-300">{form.title.length} / 50</div>
		</div>
	);
};

export default EditMentoringTitle;
