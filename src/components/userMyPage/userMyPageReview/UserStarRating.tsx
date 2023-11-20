import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useState } from "react";
import { ReactComponent as Close } from "@assets/svg/close.svg";

interface StarRatingProps {
	onClose: () => void;
	show: boolean;
}

const UserStarRating = ({ onClose, show }: StarRatingProps) => {
	const [selectedStars, setSelectedStars] = useState<number>(0);
	const { fetchDataUseAxios } = useAxios();

	const starClickHandler = (selected: number) => {
		setSelectedStars(selected);
	};

	const submitHandler = async () => {
		const data = {
			mentoringId: 2,
			comment: "test",
			rating: selectedStars,
		};

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: "/mentoring/rating",
			data: data,
		});

		if (response) {
			if (response && response.status === 200) {
				alertHandler("success", "평점 등록이 완료되었습니다.");
			} else {
				alertHandler("error", response.data);
			}
		}
	};

	const Star = ({
		selected,
		onSelect,
	}: {
		selected: boolean;
		onSelect: () => void;
	}) => (
		<span
			onClick={onSelect}
			className={
				selected
					? "text-yellow-500 text-5xl cursor-pointer"
					: "text-gray-400 text-5xl cursor-pointer"
			}
		>
			★
		</span>
	);

	return (
		<div
			className={
				show
					? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
					: "hidden"
			}
		>
			<div className="flex items-center flex-col bg-white p-4 rounded-lg shadow-md w-[20rem] ">
				<div>
					<div className="flex items-center font-bold mb-4 text-2xl ml-8">
						평점을 남겨주세요.
						<Close className="ml-4" width={15} height={15} onClick={onClose} />
					</div>
				</div>
				<div className="ml-6">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							selected={selectedStars > i}
							onSelect={() => starClickHandler(i + 1)}
						/>
					))}

					<button
						className="mt-4 px-3 py-2 ml-20 bg-main-color rounded-md font-bold text-white text-sm"
						onClick={() => submitHandler()}
					>
						제출하기
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserStarRating;
