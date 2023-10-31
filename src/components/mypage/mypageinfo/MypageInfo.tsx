import { useState } from "react";

const Mypageinfo = () => {
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<div className="flex flex-col items-center mb-24">
			<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full mb-12">
				<img
					src="src/assets/image/sample.jpg"
					alt="sample"
					className="w-full h-full rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-col ">
				<div className="lg:text-base md:text-sm text-black-400">이름</div>
				<div className="w-[15rem] my-1 p-4 border border-black-200 rounded-md text-sm focus:outline-main-color">
					김도아
				</div>
				<div className="lg:text-base md:text-sm text-black-400">이메일</div>
				<div className="w-[15rem] my-1 p-4 border border-black-200 rounded-md text-sm focus:outline-main-color">
					hcb1999@naver.com
				</div>
				<div className="lg:text-base md:text-sm text-black-400">닉네임</div>
				{isEditMode ? (
					<>
						<input
							type="text"
							className="w-[15rem] my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="이름을 변경하세요"
						/>
						<button
							type="submit"
							className="w-[15rem] mt-2 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm mr-2"
						>
							닉네임 중복 검사
						</button>
						<div className="flex justify-between w-[15rem]">
							<button
								type="submit"
								className="w-[7rem] mt-4 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm mr-2"
							>
								저장
							</button>
							<button
								type="submit"
								className="w-[7rem] mt-4 px-3 py-2 bg-red-500 rounded-md font-bold text-white text-sm"
								onClick={() => setIsEditMode(false)}
							>
								취소
							</button>
						</div>
					</>
				) : (
					<>
						<input
							type="text"
							className="w-[15rem] my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="이름을 변경하세요"
						/>
						<button
							className="mt-4 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm"
							onClick={() => setIsEditMode(true)}
						>
							수정
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Mypageinfo;
