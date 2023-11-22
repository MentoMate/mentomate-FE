import { ReactComponent as Close } from "@/assets/svg/close.svg";
import { ReactComponent as EditIcon } from "@/assets/svg/edit.svg";
import { ReactComponent as FileList } from "@/assets/svg/fileList.svg";
import { IScheduleReadModalProps } from "@/interface/scheduleReadModalProps";
import { cancelLockScroll } from "@/utils/controlBodyScroll";
import { useEffect, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import FileUpload from "./FileUpload";
import MentoringFileList from "./MentoringFileList";
import ScheduleEdit from "./ScheduleEdit";

const ScheduleReadModal = ({
	formattedDate,
	closeModal,
	eventInfo,
	scheduleReadHandler,
}: IScheduleReadModalProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isOtherScreenVisible, setOtherScreenVisible] = useState(false);
	const scheduleRef = useRef<HTMLDivElement>(null);

	const onClickEditHandler = () => {
		setIsEditing(!isEditing);
		setOtherScreenVisible(false);
	};

	const onClickFileListHandler = () => {
		setOtherScreenVisible(!isOtherScreenVisible);
		setIsEditing(false);
	};

	const onClickCloseBtnHandler = () => {
		cancelLockScroll();
		closeModal();
	};

	useEffect(() => {
		const outSideClickHandler = (e: Event) => {
			if (
				scheduleRef.current &&
				!scheduleRef.current.contains(e.target as Node)
			) {
				cancelLockScroll();
				closeModal();
			}
		};

		document.addEventListener("mousedown", outSideClickHandler);

		return () => {
			document.removeEventListener("mousedown", outSideClickHandler);
		};
	}, [scheduleRef]);

	return (
		<>
			<div className="fixed inset-0 flex items-center  justify-center z-20 ">
				<div className="absolute inset-0 bg-black opacity-50 "></div>

				<div ref={scheduleRef} className="z-10 bg-white p-8 rounded-lg mt-20 ">
					<div className="flex justify-between items-center font-semibold mt-4 text-sm lg:text-lg mb-4 ">
						날짜: {formattedDate}
						<div className="flex justify-between items-center w-[5rem]">
							<EditIcon
								className="cursor-pointer"
								onClick={onClickEditHandler}
								width={20}
								height={20}
							/>
							<FileList
								className="cursor-pointer"
								onClick={onClickFileListHandler}
								width={20}
								height={20}
							/>
							<Close
								className="cursor-pointer"
								onClick={onClickCloseBtnHandler}
								width={20}
								height={20}
							/>
						</div>
					</div>
					{isOtherScreenVisible ? (
						<MentoringFileList
							scheduleId={eventInfo.extendedProps.scheduleId}
						/>
					) : isEditing ? (
						<ScheduleEdit
							formattedDate={formattedDate}
							closeModal={closeModal}
							eventInfo={eventInfo}
							scheduleReadHandler={scheduleReadHandler}
						/>
					) : (
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
				</div>
			</div>
		</>
	);
};
export default ScheduleReadModal;
