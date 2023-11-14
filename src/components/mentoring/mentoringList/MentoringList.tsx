import { IMentoringItem } from "@/interface/mentoringItem";
import { Link } from "react-router-dom";
import MentoringItem from "./MentoringItem";

export interface IMentoringProps {
	readonly data: IMentoringItem[];
}

const MentoringList = ({ data }: IMentoringProps) => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				{data.map((mentoringItem: IMentoringItem) => (
					<Link
						key={mentoringItem.id}
						to={`/mentoringDetail/${mentoringItem.id}`}
					>
						<MentoringItem mentoringItem={mentoringItem} />
					</Link>
				))}
			</div>
		</>
	);
};

export default MentoringList;
