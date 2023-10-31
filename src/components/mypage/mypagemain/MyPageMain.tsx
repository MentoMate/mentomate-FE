import MypageMentoringList from "./MypageMentoringList";
const MypageMain = () => {
	return (
		<>
			<div className="flex items-center mb-12">
				<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full">
					<img
						src="src/assets/image/sample.jpg"
						alt="sample"
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center ml-6">
					<div className="lg:text-base md:text-sm text-black-400">이름</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						김도아
					</div>
					<div className="lg:text-base md:text-sm text-black-400">이메일</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						hcb1999@naver.com
					</div>
				</div>
			</div>
			<div>
				<div className=" flex justify-between items-center mb-6 md:text-2xl text-xl font-bold">
					최근 알림
				</div>
				<div>OOO님이 멘토링을 결제 하였습니다</div>
			</div>
			<div>
				<div className=" flex justify-between items-center mb-6 md:text-2xl text-xl font-bold mt-16">
					진행중인 멘토링
				</div>

				<MypageMentoringList />
			</div>
		</>
	);
};
export default MypageMain;
