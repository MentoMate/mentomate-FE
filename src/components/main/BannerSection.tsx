const BannerSection = () => {
	return (
		<>
			<div className="flex justify-center items-center w-full  bg-[#ABDEE6] lg:py-12">
				<div className="text-3xl text-center leading-8 lg:w-[30rem] hidden lg:block mr-16">
					멘토와 멘티들을 이어주는 매칭 플랫폼 멘토 메이트
				</div>

				<img
					className=" w-[30rem]  lg:w-[40rem] md:w-[40rem] object-cover"
					src="https://www.robertwalters.co.kr/content/dam/robert-walters/country/japan/images/website-update-2019/mentor-system.jpg"
					alt="card image"
				/>
			</div>
		</>
	);
};

export default BannerSection;
