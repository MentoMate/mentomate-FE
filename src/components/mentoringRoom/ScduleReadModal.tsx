import { useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import ReactQuill from "react-quill";
import { quillModules } from "@/modules/quillModules";
import "react-quill/dist/quill.snow.css";
import { IScduleReadModalProps } from "@/types/scdulereadmodalprop";

const ScduleReadModal: React.FC<IScduleReadModalProps> = ({
	formattedDate,
	closeModal,
	eventText,
	eventDescription,
}) => {
	const [descriptionText, setDescriptionText] = useState(eventDescription);
	const [titleText, setTitleText] = useState(eventText);
	return (
		<>
			<div className="fixed inset-0 flex items-center  justify-center z-20 ">
				<div className="absolute inset-0 bg-black opacity-50 "></div>
				<div className="z-10 bg-white p-8 rounded-lg mt-20 ">
					{/*모달 전체 박스*/}
					<div className="flex justify-between items-center  w-[15rem] lg:w-[40rem]">
						<Close onClick={closeModal} width={20} height={20} />
					</div>

					<div className="font-semibold mt-4 text-sm lg:text-lg ">
						날짜: {formattedDate}
					</div>
					<form className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[15rem] lg:w-[40rem]">
						<input
							type="text"
							className="my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="제목을 입력해주세요"
							onChange={(e) => setTitleText(e.target.value)}
							value={titleText}
						/>
						<ReactQuill
							value={descriptionText}
							onChange={setDescriptionText}
							modules={quillModules}
							className="h-[10rem] lg:h-[30rem] mb-12"
							placeholder="설명"
						/>
						<button
							type="submit"
							className=" px-3 py-4 bg-main-color rounded-md font-bold text-white text-lg"
						>
							저장하기
						</button>
					</form>

					{/* 모달 내용을 추가하세요 */}
				</div>
			</div>
		</>
	);
};
export default ScduleReadModal;
