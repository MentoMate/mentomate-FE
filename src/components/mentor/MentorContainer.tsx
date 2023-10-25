import SortAndSearch from "@components/common/search/SortAndSearch";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentoringList/MentorList";
import NonExistMentoringList from "../mentoring/mentoringList/NonExistMentoringList";

const MentorContainer = () => {
	const test = 1;

	return (
		<div>
			<MentorRegister />
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<SortAndSearch />
				{test === 1 ? <MentorList /> : <NonExistMentoringList />}
			</div>
		</div>
	);
};

export default MentorContainer;
