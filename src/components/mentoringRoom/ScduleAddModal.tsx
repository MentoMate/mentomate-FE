import { useState } from "react";

const ScduleAddModal = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	return (
		<>
			<button
				className="absolute bottom-10 right-10 bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full z-10 shadow-lg hidden lg:block"
				onClick={openModal}
			>
				일정 추가
			</button>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-20">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div className="z-10 bg-white p-4 rounded-lg">
						<h2 className="text-lg font-semibold mb-2">일정 추가</h2>
						{/* 모달 내용을 추가하세요 */}
						<button
							className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 rounded-full"
							onClick={closeModal}
						>
							닫기
						</button>
					</div>
				</div>
			)}
		</>
	);
};
export default ScduleAddModal;
