import { IMentoringDetailProps } from "@/interface/mentoringInfo";
console.log("asd");
const MentoringContent = ({ data }: IMentoringDetailProps) => {
	return (
		<div className="lg:w-[40rem] md:w-[25rem] sm:w-[20rem] sm:mx-0 mx-4">
			<h1 className="mb-12 text-2xl font-bold">{data.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: data.content }} />
		</div>
	);
};

export default MentoringContent;
