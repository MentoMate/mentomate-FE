import { useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";

const MentoringInfoModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onClickOpenModal = () => {
		setIsModalOpen(true);
	};

	const onClickCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<button
				title="mentoring_info"
				className="absolute top-0 right-40 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg hidden lg:flex "
				onClick={onClickOpenModal}
			>
				멘토링 정보
			</button>
			<button
				title="mentoring_info"
				className="flex absolute top-10 right-0 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg lg:hidden "
				onClick={onClickOpenModal}
			>
				<Search width={15} height={15} />
			</button>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center  justify-center z-20 ">
					<div className="absolute inset-0 bg-black opacity-50 "></div>
					<div className="z-10 bg-white p-8 rounded-lg mt-20 ">
						{/*모달 전체 박스*/}
						<div className="flex justify-between items-center  w-[15rem] lg:w-[30rem]">
							<h2 className="text-sm lg:text-lg font-semibold mb-2">
								치어리더가 되기 위한 준비 과정 그리고 노하우
							</h2>
							<Close onClick={onClickCloseModal} width={20} height={20} />
						</div>
						<div className="flex items-center w-[15rem] lg:w-[30rem] border-b-2">
							<h2 className="text-sm lg:text-lg mr-2 mb-2">멘토링 정보</h2>
						</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg ">멘토</div>
						<div>김도아 멘토</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg  ">이력</div>
						<div>4년 6개월</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg   ">소개</div>
						<div className="text-sm lg:text-lg w-[15rem] lg:w-[30rem]">
							안녕하세요. 멘토링 주제와 관련하여 궁금하신 부분들을 제 경험에
							빗대어 성실히 답변드리겠습니다~~
						</div>
						<div className="font-semibold mt-4 text-sm lg:text-lg  ">
							대화 주제
						</div>
						<div>디자인/예술</div>
						{/* 모달 내용을 추가하세요 */}
					</div>
				</div>
			)}
		</>
	);
};
export default MentoringInfoModal;
