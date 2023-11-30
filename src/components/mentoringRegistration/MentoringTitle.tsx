import { mentoringRegistrationForm } from "@/data/mentoringRegistrationForm";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";

const MentoringTitle = () => {
	const [form, setForm] = useRecoilState(mentoringRegistrationForm);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setForm({
			...form,
			title: value,
		});
	};

	return (
		<div className="flex items-center mt-4 border rounded-md sm:text-base text-sm">
			<input
				type="text"
				className="grow px-4 py-4 rounded-md outline-none placeholder:text-black-300"
				placeholder="멘토링 제목을 입력하세요."
				maxLength={50}
				onChange={onChangeTitleHandler}
			/>
			<div className="w-[5rem] text-black-300">{form.title.length} / 50</div>
		</div>
	);
};

export default MentoringTitle;
