import MentoringTitle from "./MentoringTitle";
import Search from "./Search/Search";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const Mentoring = () => {
	const test = 1;
	return (
		<div>
			<div className="mx-auto w-[60rem]">
				<Search />
				<MentoringTitle />
				{test === 1 ? <MentoringList /> : <NonExistMentoringList />}
			</div>
		</div>
	);
};

export default Mentoring;
