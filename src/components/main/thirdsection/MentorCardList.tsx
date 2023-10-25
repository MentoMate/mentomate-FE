import MentorCard from "./MentorCard";
const cardData = [
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "오킹 멘토",
		detail: "유튜브와 트위치에서 활동중인 오병민입니다. 반갑습니다.",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "오킹 멘토",
		detail: "유튜브와 트위치에서 활동중인 오병민입니다. 반갑습니다.",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "오킹 멘토",
		detail: "유튜브와 트위치에서 활동중인 오병민입니다. 반갑습니다.",
	},
	{
		src: "https://i.namu.wiki/i/2s3qra3zMVF-7OaddPxrA_PokTAjSItF_gByFSWnOT9O6l5XLS62QhKtlcQJdxGv5z1_cFbFGaM0bzfpm3a8ew.webp",
		name: "오킹 멘토",
		detail: "유튜브와 트위치에서 활동중인 오병민입니다. 반갑습니다.",
	},
];

const CardList = () => {
	return (
		<div className="flex flex-wrap justify-center items-center mx-auto lg:w-[80rem] mt-10 ">
			{cardData.map((card, index) => (
				<MentorCard
					key={index}
					src={card.src}
					name={card.name}
					detail={card.detail}
				/>
			))}
		</div>
	);
};

export default CardList;
