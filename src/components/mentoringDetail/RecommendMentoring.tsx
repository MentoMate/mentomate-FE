import RecommendMentoringItem from "./RecommendMentoringItem";

const RecommendMentoring = () => {
	const sample = ["1", "2", "3"];

	return (
		<div className="mt-20 sm:mx-0 mx-4">
			<h2 className="text-lg font-bold">이런 멘토링은 어때요?</h2>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center">
				{sample.map((element, index) => (
					<div key={element} className={`${index === 0 ? "md:mr-2" : "mx-2"}`}>
						<RecommendMentoringItem />
					</div>
				))}
			</div>
		</div>
	);
};

export default RecommendMentoring;
