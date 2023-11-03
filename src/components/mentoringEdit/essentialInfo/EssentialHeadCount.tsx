import { mentoringEditForm } from "@/data/mentoringEditForm";
import { ReactComponent as People } from "@assets/svg/people.svg";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";

const HeadCount = () => {
	const [form, setForm] = useRecoilState(mentoringEditForm);

	const onChangeNumberOfPeopleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			numberOfPeople: Number(e.target.value),
		});
	};

	return (
		<div className="flex sm:flex-row flex-col mt-4 lg:text-lg md:text-base text-sm">
			<div className="flex items-center lg:w-[10rem] md:w-[8rem] sm:w-[6rem] w-[7rem] sm:mb-0 mb-2 font-semibold">
				<People width={25} height={25} className="mr-2" />
				인원수
			</div>
			<div className="flex items-center grow">
				<div className="flex items-center sm:ml-2 border border-black-200 rounded-sm focus:outline-main-color">
					<input
						type="number"
						className="px-4 py-2 sm:w-[12.5rem] w-full rounded-md outline-none"
						defaultValue={form.numberOfPeople}
						onChange={onChangeNumberOfPeopleHandler}
					/>
					<div className="pl-2 pr-4">명</div>
				</div>
			</div>
		</div>
	);
};

export default HeadCount;
