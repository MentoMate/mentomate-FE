const MentorInfo = () => {
	return (
		<div className="flex flex-col justify-center items-center sticky top-[8rem] md:mx-0 mx-auto md:ml-8 md:w-full w-[18rem] h-[15rem] border border-black-200 rounded-md">
			<div className="flex items-center">
				<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full">
					<img
						src="src/assets/image/sample.jpg"
						alt="sample"
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center ml-6">
					<div className="lg:text-base md:text-sm text-black-400">서비스</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						김도아
						<span className="ml-1 lg:text-sm md:text-[0.8rem] text-sm font-medium">
							멘토
						</span>
					</div>
					<div className="mt-0.5 lg:text-base md:text-sm text-base text-black-500">
						경력 : <span>4년</span>
					</div>
					<div className="mt-0.5 lg:text-base md:text-sm text-base text-black-500">
						팔로워 18명
					</div>
				</div>
			</div>
			<button className="mt-6 bg-main-color lg:px-20 md:px-14 px-20 py-2 text-white text-lg font-bold rounded-sm">
				팔로우
			</button>
		</div>
	);
};

export default MentorInfo;
