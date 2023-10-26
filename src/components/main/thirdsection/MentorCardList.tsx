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
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			{cardData.map(() => (
				<MentorCard />
			))}
		</div>
	);
};

export default CardList;
