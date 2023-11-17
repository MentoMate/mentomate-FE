export interface IMyPaymentItem {
	readonly amount: number;
	readonly mentorNickname: string;
	readonly mentoringEndDate: string;
	readonly mentoringStartDate: string;
	readonly mentoringTitle: string;
	readonly payStatus: string;
	readonly paymentDate: string;
}

export interface IMyPaymentItemProps {
	readonly data: IMyPaymentItem[];
}
