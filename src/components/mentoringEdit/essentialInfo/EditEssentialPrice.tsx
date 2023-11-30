import { mentoringEditForm } from "@/data/mentoringEditForm";
import { ReactComponent as PriceIcon } from "@assets/svg/cash.svg";
import { ReactComponent as WonSign } from "@assets/svg/wonSign.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const EditEssentialPrice = () => {
	const [form, setForm] = useRecoilState(mentoringEditForm);
	const [replaceAmount, setReplaceAmount] = useState<string>("");

	const onChangeAmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = parseFloat(value.replace(/,/g, ""));

		if (!isNaN(numericValue)) {
			setReplaceAmount(numericValue.toLocaleString());
		} else {
			setReplaceAmount("");
		}

		setForm({
			...form,
			amount: Number(e.target.value),
		});
	};

	useEffect(() => {
		const numericValue = parseFloat(String(form.amount).replace(/,/g, ""));
		setReplaceAmount(numericValue.toLocaleString());
	}, [form.uploadFolder]);

	return (
		<div className="flex sm:flex-row flex-col mt-4 lg:text-lg md:text-base text-sm">
			<div className="flex items-center sm:mb-0 mb-2 lg:w-[10rem] md:w-[8rem] sm:w-[6rem] w-[7rem] font-semibold">
				<PriceIcon width={25} height={25} className="mr-2" />
				금액
			</div>
			<div className="flex items-center grow ">
				<div className="flex items-center sm:ml-2 border border-black-200 rounded-sm">
					<input
						type="text"
						className="px-4 py-2 sm:w-[12.5rem] w-full rounded-sm outline-none text-right placeholder:text-sm"
						value={replaceAmount}
						onChange={onChangeAmountHandler}
						placeholder="금액을 입력하세요"
					/>
					<div className="pl-2 pr-4">
						<WonSign width={15} height={15} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditEssentialPrice;
