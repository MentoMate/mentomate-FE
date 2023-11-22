import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { ChangeEvent, useState } from "react";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import useInput from "@/hooks/useInput";

interface StarRatingProps {
	readonly onClose: () => void;
	readonly show: boolean;
	readonly mentoringId: number;
}

const UserStarRating = ({ onClose, show, mentoringId }: StarRatingProps) => {
	const [selectedStars, setSelectedStars] = useState<number>(0);
	const { fetchDataUseAxios } = useAxios();
	const [reviewText, setReviewText] = useInput("");

	const starClickHandler = (selected: number) => {
		setSelectedStars(selected);
	};

	const submitHandler = async () => {
		if (reviewText.length < 10) {
			alertHandler("warning", "후기는 최소 10자 이상입니다.");
			return;
		}

		if (selectedStars === 0) {
			alertHandler("warning", "평점을 선택해주세요.");
			return;
		}

		const data = {
			mentoringId: mentoringId,
			comment: reviewText,
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
				onClose();
			} else {
				alertHandler("error", response.data);
			}
		}
	};

	const onChangeReviewTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;

		if (value.length > 255) {
			alertHandler("warning", "멘토링 후기는 최대 255자 입니다.");
			return;
		}

		setReviewText(value);
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
				</div>
				<textarea
					className="w-[10rem] h-[10rem] border border-black-200 rounded-[0.3rem] outline-none resize-none"
					onChange={onChangeReviewTextHandler}
				/>
				<button
					className="mt-4 px-3 py-2 ml-20 bg-main-color rounded-md font-bold text-white text-sm"
					onClick={() => submitHandler()}
				>
					제출하기
				</button>
			</div>
		</div>
	);
};

export default UserStarRating;
