const PastMentoringItem = () => {
	return (
		<div className="lg:mt-0 md:mt-4 mt-8 w-[12rem]">
			<div className="w-full h-[15rem] object-cover">
				<img
					src="/src/assets/image/sample.jpg"
					alt="sample"
					className="w-full h-full"
				/>
			</div>
			<p className="lg:mt-3 mt-1 title-overflow font-semibold">
				치어리더가 되기 위한 준비과정 멘토링
			</p>
		</div>
	);
};

export default PastMentoringItem;
