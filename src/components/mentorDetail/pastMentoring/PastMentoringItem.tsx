import { IPastMentoring } from "@/interface/MentoringDetail";

interface IProps {
	readonly pastMentoring: IPastMentoring;
}

const PastMentoringItem = ({ pastMentoring }: IProps) => {
	console.log("asd");
	return (
		<div className="md:mt-4 mt-8 w-[12rem]">
			<div className="w-full h-[15rem] object-cover">
				<img
					src={pastMentoring.uploadUrl}
					alt="sample"
					className="w-full h-full"
				/>
			</div>
			<p className="lg:mt-3 mt-1 title-overflow font-semibold">
				{pastMentoring.title}
			</p>
		</div>
	);
};

export default PastMentoringItem;
