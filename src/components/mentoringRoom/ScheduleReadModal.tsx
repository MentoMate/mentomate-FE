import { useState } from "react";
import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { ReactComponent as FileList } from "@/assets/svg/filelist.svg";
import { ReactComponent as EditIcon } from "@/assets/svg/edit.svg";

import "react-quill/dist/quill.snow.css";
import { IScduleReadModalProps } from "@/types/scdulereadmodalprop";
import FileUpload from "./FileUpload";
import MentoringFileList from "./MentoringFileList";
import ScduleEdit from "./ScheduleEdit";

const ScheduleReadModal: React.FC<IScduleReadModalProps> = ({
	formattedDate,
	closeModal,
	eventInfo,
}) => {
	console.log(eventInfo.extendedProps.scheduleId);
	const [isEditing, setIsEditing] = useState(false);
	const [isOtherScreenVisible, setOtherScreenVisible] = useState(false);

	const onClickEdithandler = () => {
		// 수정 아이콘 클릭 시
		setIsEditing(!isEditing);
		setOtherScreenVisible(false); // 수정 모드로 전환 시 파일 리스트를 숨깁니다.
	};

	const onClickFilelisthandler = () => {
		// 파일 리스트 아이콘 클릭 시
		setOtherScreenVisible(!isOtherScreenVisible);
		setIsEditing(false); // 파일 리스트로 전환 시 수정 모드를 종료합니다.
	};

	// 나머지 코드는 동일하게 유지

	return (
		<>
			<div className="fixed inset-0 flex items-center  justify-center z-20 ">
				<div className="absolute inset-0 bg-black opacity-50 "></div>

				<div className="z-10 bg-white p-8 rounded-lg mt-20 ">
					{/*모달 전체 박스*/}

					<div className="flex justify-between items-center font-semibold mt-4 text-sm lg:text-lg mb-4 ">
						날짜: {formattedDate}{" "}
						<div className="flex justify-between items-center w-[5rem]">
							<EditIcon onClick={onClickEdithandler} width={20} height={20} />
							<FileList
								onClick={onClickFilelisthandler}
								width={20}
								height={20}
							/>
							<Close onClick={closeModal} width={20} height={20} />
						</div>
					</div>

					{isOtherScreenVisible ? (
						<MentoringFileList />
					) : isEditing ? (
						// 수정 모드
						<ScduleEdit
							formattedDate={formattedDate}
							closeModal={closeModal}
							eventInfo={eventInfo}
						/>
					) : (
						// 수정 모드가 아닐 때
						<div className="flex flex-col mt-2 mx-auto lg:h-[40rem] w-[15rem] lg:w-[40rem]">
							<FileUpload scheduleId={eventInfo.extendedProps.scheduleId} />
							<div className="flex items-center mt-2 border rounded-md sm:text-base text-sm mb-4">
								<div className="px-4 py-4 rounded-md">{eventInfo.title}</div>
							</div>
							<div className="px-4 py-4 border h-[5rem] lg:h-[100rem] md:h-[15rem] sm:h-[10rem] overflow-y-auto">
								<div
									dangerouslySetInnerHTML={{
										__html: eventInfo.extendedProps.content,
									}}
								/>
							</div>
						</div>
					)}

					{/* 모달 내용을 추가하세요 */}
				</div>
			</div>
		</>
	);
};
export default ScheduleReadModal;
