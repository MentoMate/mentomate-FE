import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const MentoringContainer = () => {
	const test = 1;
	return (
		<div>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<SortAndSearch />
				<MentoringTitle />
				{test === 1 ? <MentoringList /> : <NonExistMentoringList />}
			</div>
		</div>
	);
};

export default MentoringContainer;
