interface IRecommendMentoring {
	readonly mentoringId: number;
	readonly title: string;
	readonly content: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly status: string;
	readonly category: string;
	readonly uploadUrl: string;
	readonly uploadFolder: string;
	readonly countWatch: number;
	readonly rating: number;
	readonly name: string;
	readonly registerDate: string;
	readonly updateDate: string;
	readonly deleteDate: string | null;
}

interface IProps {
	readonly recommendMentoring: IRecommendMentoring;
}

const RecommendMentoringItem = ({ recommendMentoring }: IProps) => {
	return (
		<div className="my-4 w-[13rem] lg:w-[13rem] md:w-[10rem]">
			<div className="w-[13rem] lg:w-[13rem] md:w-[10rem] lg:h-[15rem] md:h-[12rem]">
				<img
					src={recommendMentoring.uploadUrl}
					alt="asd"
					className="w-full h-full object-cover"
				/>
			</div>
			<div className="my-2 title-overflow">{recommendMentoring.title}</div>
		</div>
	);
};

export default RecommendMentoringItem;
