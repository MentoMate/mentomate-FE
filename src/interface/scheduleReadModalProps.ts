export interface IScheduleReadModalProps {
	readonly formattedDate: string;
	readonly closeModal: () => void;
	readonly eventInfo: any;
	readonly scheduleReadHandler: () => void;
}
