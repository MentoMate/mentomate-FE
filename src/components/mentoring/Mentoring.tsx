import Search from "./Search/Search";
import MentoringList from "./mentoringList/MentoringList";

const Mentoring = () => {
	return (
		<>
			<div className="mx-auto w-[60rem]">
				<Search />
				<div className="flex justify-between items-center mt-6">
					<h1 className="mx-2 text-2xl font-bold">멘토링 목록</h1>
					<button className="px-4 py-2.5  bg-main-color rounded-lg text-lg font-bold text-white">
						멘토링 등록
					</button>
				</div>
				<MentoringList />
			</div>
		</>
	);
};

export default Mentoring;
