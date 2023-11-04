import { IMentoringProps } from "@/interface/mentoringItem";
import { Link } from "react-router-dom";
import MentoringItem from "./MentoringItem";

const MentoringList = ({ data }: IMentoringProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				{data.map((mentoringItem) => (
					<Link
						key={mentoringItem.mentoringId}
						to={`/mentoringDetail/${mentoringItem.mentoringId}`}
					>
						<MentoringItem mentoringItem={mentoringItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default MentoringList;
