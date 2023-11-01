import { mentoringRegistrationData } from "@/data/mentoringRegistrationData";
import { useState, ChangeEvent } from "react";
import { useRecoilState } from "recoil";

const MentoringTitle = () => {
	const [title, setTitle] = useState<number>(0);
	const [formData, setFormData] = useRecoilState(mentoringRegistrationData);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setFormData({
			title: value,
			content: formData.content,
			startDate: formData.startDate,
			endDate: formData.endDate,
			numberOfPeople: formData.numberOfPeople,
			amount: formData.amount,
			category: formData.category,
			// img: formData.img,
		});
		setTitle(value.length);
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
			<div className="w-[5rem] text-black-300">{title} / 50</div>
		</div>
	);
};

export default MentoringTitle;
