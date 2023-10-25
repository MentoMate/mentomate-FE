const MentorProfile = () => {
	return (
		<div className="flex items-center mt-8 border border-black-200 rounded-sm">
			<div className="w-[5rem] h-[6rem]">
				<img
					src="/src/assets/image/sample.jpg"
					alt="sample"
					className="w-full h-full"
				/>
			</div>
			<div className="lg:ml-3 md:ml-2 ml-3">
				<div className="mb-1 lg:text-base md:text-[0.7rem] text-base">
					<span className="lg:text-xl md:text-sm text-xl font-bold">
						조인성
					</span>
					멘토
				</div>
				<div className="lg:text-sm md:text-[0.7rem] text-sm">팔로워 18명</div>
			</div>
		</div>
	);
};

export default MentorProfile;
