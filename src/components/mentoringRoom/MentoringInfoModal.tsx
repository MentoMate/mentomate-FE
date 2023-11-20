import { useEffect, useRef, useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";

const MentoringInfoModal = () => {
	const mentoringInfoModalRef = useRef<HTMLDivElement>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onClickOpenModal = () => {
		lockScroll();
		setIsModalOpen(true);
	};

	const onClickCloseModal = () => {
		cancelLockScroll();
		setIsModalOpen(false);
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				mentoringInfoModalRef.current &&
				!mentoringInfoModalRef.current.contains(e.target as Node)
			) {
				cancelLockScroll();
				setIsModalOpen(false);
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [mentoringInfoModalRef]);

	return (
		<>
			<button
				title="mentoring_info"
				className="hidden lg:flex items-center mx-1 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-[0.3rem] z-10 transition duration-200"
				onClick={onClickOpenModal}
			>
				멘토링 정보
			</button>
			<button
				title="mentoring_info"
				className="flex lg:hidden bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg transition duration-200"
				onClick={onClickOpenModal}
			>
				<Search width={15} height={15} />
			</button>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-[100] ">
					<div className="absolute inset-0 bg-black opacity-50" />
					<div
						ref={mentoringInfoModalRef}
						className="bg-white p-8 rounded-lg mt-20 z-10"
					>
						<div className="flex justify-between items-center w-[15rem] lg:w-[30rem]">
							<h2 className="text-sm lg:text-lg font-semibold mb-2">
								치어리더가 되기 위한 준비 과정 그리고 노하우
							</h2>
							<Close
								onClick={onClickCloseModal}
								width={20}
								height={20}
								className="cursor-pointer"
							/>
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
					</div>
				</div>
			)}
		</>
	);
};
export default MentoringInfoModal;
