import MentorItem from "./MentorItem";

const MentorList = () => {
	return (
		<div className="mx-2 mt-10">
			<h1 className="text-xl sm:text-2xl font-bold">멘토 목록</h1>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				<MentorItem />
				<MentorItem />
				<MentorItem />
				<MentorItem />
				<MentorItem />
				<MentorItem />
				<MentorItem />
				<MentorItem />
			</div>
		</div>
	);
};

export default MentorList;
