import MentoringTitle from "./MentoringTitle";
import Search from "./Search/Search";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const Mentoring = () => {
	const test = 1;
	return (
		<div>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<Search />
				<MentoringTitle />
				{test === 1 ? <MentoringList /> : <NonExistMentoringList />}
			</div>
		</div>
	);
};

export default Mentoring;