import { ReactComponent as Star } from "@assets/svg/star.svg";

const MentorItem = () => {
	return (
		<>
			<div className="mt-12 w-[14rem] bg-black-100 rounded-lg duration-100 hover:scale-105">
				<img
					src="src/assets/image/sample.jpg"
					alt="asd"
					className="w-full h-[15rem] rounded-t-lg object-cover"
				/>
				<div className="flex justify-center items-center mt-2 text-sm font-bold">
					디자인 / 예술
				</div>
				<div className="flex justify-center items-center mt-2">
					<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
						<Star width={20} height={20} className="mr-1" />
						<div className="font-semibold text-sm">4.9</div>
					</div>
					<div className="ml-3 text-md font-semibold">김도아 멘토</div>
				</div>
				<p className="w-[13rem] h-[3rem] mx-3 mt-2 mb-4 font-semibold title-overflow">
					안녕하세여 치어리더 전문 김도아 멘토입니다. 안녕하세여 치어리더 전문
					김도아 멘토입니다. 안녕하세여 치어리더 전문 김도아 멘토입니다.
					안녕하세여 치어리더 전문 김도아 멘토입니다. 안녕하세여 치어리더 전문
					김도아 멘토입니다.
				</p>
			</div>
		</>
	);
};

export default MentorItem;
