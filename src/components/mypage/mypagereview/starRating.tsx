import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useState } from "react";

interface StarRatingProps {
	onClose: () => void;
	show: boolean;
}

const StarRating = ({ onClose, show }: StarRatingProps) => {
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
		console.log(data);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "PUT",
			url: "/mentoring/rating",
			data: data,
		});
		console.log(response);
		if (response && response.status === 200) {
			alertHandler("success", "평점 등록이 완료되었습니다.");
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
				selected ? "text-yellow-500 text-5xl" : "text-gray-400 text-5xl"
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
			<div className="bg-white p-4 rounded-lg shadow-md">
				<button className="" onClick={onClose}>
					Close
				</button>
				<div>
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							selected={selectedStars > i}
							onSelect={() => starClickHandler(i + 1)}
						/>
					))}
					<p>{selectedStars} / 5</p>
					<button onClick={() => submitHandler()}>제출하기</button>
				</div>
			</div>
		</div>
	);
};

export default StarRating;
