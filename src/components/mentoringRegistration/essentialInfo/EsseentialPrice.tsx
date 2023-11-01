import { mentoringRegistrationData } from "@/data/mentoringRegistrationData";
import { ReactComponent as PriceIcon } from "@assets/svg/cash.svg";
import { ReactComponent as WonSign } from "@assets/svg/wonSign.svg";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";

const EsseentialPrice = () => {
	const [formData, setFormData] = useRecoilState(mentoringRegistrationData);

	const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setFormData({
			title: formData.title,
			content: formData.content,
			startDate: formData.startDate,
			endDate: formData.endDate,
			numberOfPeople: formData.numberOfPeople,
			amount: Number(value),
			category: formData.category,
			// img: formData.img,
		});
	};

	return (
		<div className="flex sm:flex-row flex-col mt-4 lg:text-lg md:text-base text-sm">
			<div className="flex items-center sm:mb-0 mb-2 lg:w-[10rem] md:w-[8rem] sm:w-[6rem] w-[7rem] font-semibold">
				<PriceIcon width={25} height={25} className="mr-2" />
				금액
			</div>
			<div className="flex items-center grow ">
				<div className="flex items-center sm:ml-2 border border-black-200 rounded-sm">
					<input
						type="number"
						className="px-4 py-2 sm:w-[12.5rem] w-full rounded-sm outline-none"
						onChange={onChangePriceHandler}
					/>
					<div className="pl-2 pr-4">
						<WonSign width={15} height={15} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default EsseentialPrice;
