import { IMentorItemProps } from "@/interface/mentorItem";

const MentorIntroduce = ({ mentorItem }: IMentorItemProps) => {
	return (
		<div className="md:mx-0 mx-4 lg:w-[40rem] md:w-[25rem] w-[17rem]">
			<h1 className="mb-6 md:text-2xl text-xl font-bold">멘토 소개</h1>
			<div
				dangerouslySetInnerHTML={{ __html: mentorItem.introduce }}
				className="min-h-[10rem] md:text-base text-sm"
			/>
		</div>
	);
};

export default MentorIntroduce;
