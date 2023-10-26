import Card from "../firstsection/MentoringCard";
import { useState } from "react";
const cardData = [
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "김도아 멘토",
		detail: "치어리더가 되기 위한 준비 과정 그리고 노하우",
		date: "2023.10.18 ~ 2023.10.31",
		price: "59,900 ₩",
		people: "6명",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "김도아 멘토",
		detail: "치어리더가 되기 위한 준비 과정 그리고 노하우",
		date: "2023.10.18 ~ 2023.10.31",
		price: "59,900 ₩",
		people: "6명",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "김도아 멘토",
		detail: "치어리더가 되기 위한 준비 과정 그리고 노하우",
		date: "2023.10.18 ~ 2023.10.31",
		price: "59,900 ₩",
		people: "6명",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "김도아 멘토",
		detail: "치어리더가 되기 위한 준비 과정 그리고 노하우",
		date: "2023.11.18 ~ 2023.10.31",
		price: "69,900 ₩",
		people: "7명",
	},
];

const DeadlineMentoringList = () => {
	const [mentoringData] = useState(cardData);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32">
			{mentoringData.map((card: any, index: any) => (
				<Card
					key={index}
					src={card.src}
					name={card.name}
					detail={card.detail}
					date={card.date}
					price={card.price}
					people={card.people}
				/>
			))}
		</div>
	);
};

export default DeadlineMentoringList;
