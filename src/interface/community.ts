export interface ICommunityList {
	readonly id: number;
	readonly category: string;
	readonly title: string;
	readonly content: string;
	readonly registerDateTime: Date;
	readonly updateDateTime: Date;
}
