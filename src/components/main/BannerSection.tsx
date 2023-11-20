const BannerSection = () => {
	return (
		<>
			<div className="flex justify-center items-center bg-main-color lg:py-12">
				<div className="text-center lg:w-[30rem] md:text-xl text-lg font-bold hidden lg:block mr-16">
					<div>멘토와 멘티들을 이어주는 매칭 플랫폼</div>
					<p className="mt-4">멘토 메이트</p>
				</div>

				<img
					className=" w-[30rem] lg:w-[25rem] md:w-[40rem] object-cover"
					src="https://www.robertwalters.co.kr/content/dam/robert-walters/country/japan/images/website-update-2019/mentor-system.jpg"
					alt="card image"
				/>
			</div>
		</>
	);
};

export default BannerSection;
