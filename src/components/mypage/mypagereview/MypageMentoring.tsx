import { ReactComponent as Calendar } from "@assets/svg/blackCalendar.svg";
import { ReactComponent as Star } from "@assets/svg/star.svg";
import { ReactComponent as Group } from "@assets/svg/people.svg";
import { ReactComponent as Cash } from "@assets/svg/cash.svg";
import { useState } from "react";
import StarRating from "./starRating";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";

const MypageMentoring = () => {
	const [showModal, setShowModal] = useState(false);

	const handleRatingClick = () => {
		setShowModal(true);
		lockScroll();
	};

	const handleCloseModal = () => {
		setShowModal(false);
		cancelLockScroll();
	};

	return (
		<>
			{showModal && (
				<StarRating show={showModal} onClose={handleCloseModal}></StarRating>
			)}

			<div className="mt-4 w-[14rem] bg-black-100 rounded-lg  ">
				<img
					src="src/assets/image/sample.jpg"
					alt="asd"
					className="w-full h-[15rem] rounded-t-lg object-cover"
				/>
				<div className="flex justify-center items-center mt-2">
					<div className="flex justify-center items-center px-2 py-1 bg-white rounded-xl shadow-sm">
						<Star width={20} height={20} className="mr-1" />
						<div className="font-semibold text-sm">4.9</div>
					</div>
					<div className="ml-3 text-md font-semibold">김도아 멘토</div>
				</div>
				<p className="w-[13rem] h-[3.5rem] mx-3 mt-2 text-lg font-bold title-overflow">
					치어리더가 되기 위한 준비과정 그리고 노하우
				</p>
				<div className="flex items-center mt-4 ml-3">
					<Calendar width={23} height={23} />
					<div className="ml-2 font-semibold text-sm">
						2023.10.24 ~ 2023.10.31
					</div>
				</div>
				<div className="flex items-center mt-2 ml-3">
					<Cash width={23} height={23} />
					<div className="ml-2 font-semibold text-sm">59,900 ₩</div>
				</div>
				<div className="flex ">
					<div className="flex items-center mt-2 mb-4 ml-3">
						<Group width={23} height={23} />
						<div className="ml-2 font-semibold text-sm">6명</div>
					</div>
					<div className="ml-12">
						<button
							onClick={handleRatingClick}
							type="submit"
							className="w-[3rem] mt-2 mr-2 mb-4 py-1 bg-main-color rounded-md font-bold text-white text-xs"
						>
							평점
						</button>
						<button
							type="submit"
							className="w-[3rem] mt-2 mb-4 py-1 bg-red-500 rounded-md font-bold text-white text-xs"
						>
							후기
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default MypageMentoring;
