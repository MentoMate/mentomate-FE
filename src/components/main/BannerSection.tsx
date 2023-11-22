import { ReactComponent as Logo } from "@assets/svg/logoMainColor.svg";

const BannerSection = () => {
	return (
		<>
			<div className="flex flex-col justify-center items-center relative pt-6 pb-12 w-full bg-white">
				<div className="flex items-center">
					<Logo className="w-44 h-24" />
					<p className="ml-4 text-2xl font-bold">
						멘토 & 멘티 매칭 플랫폼 - MENTORMATE :)
					</p>
				</div>
				<img
					className="w-[30rem] lg:w-[60rem] md:w-[40rem] h-[20rem] object-cover"
					src="/src/assets/image/mentorMateBanner.jpg"
					alt="card image"
				/>
			</div>
		</>
	);
};

export default BannerSection;
