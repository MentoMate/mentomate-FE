import { communityRegistrationForm } from "@/data/communityRegistrationForm";
import { useRecoilState } from "recoil";
import { ChangeEvent } from "react";

const EditCommunityTitle = () => {
	const [form, setForm] = useRecoilState(communityRegistrationForm);

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, title: e.target.value });
	};

	return (
		<div className="flex items-center mt-4 border rounded-md sm:text-base text-sm">
			<input
				type="text"
				className="grow px-4 py-4 rounded-md outline-none placeholder:text-black-300"
				placeholder="게시글 제목을 입력하세요."
				maxLength={50}
				defaultValue={form.title}
				onChange={onChangeTitleHandler}
			/>
			<div className="w-[5rem] text-black-300"> {form.title.length}/ 50</div>
		</div>
	);
};

export default EditCommunityTitle;
