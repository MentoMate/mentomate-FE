import MentorCard from "./MentorCard";

const CardList = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mx-auto mb-32 ">
			<MentorCard />
			<MentorCard />
			<MentorCard />
			<MentorCard />
		</div>
	);
};

export default CardList;
