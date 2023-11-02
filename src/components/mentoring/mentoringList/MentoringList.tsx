import { Link } from "react-router-dom";
import MentoringItem from "./MentoringItem";

const MentoringList = () => {
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 place-items-center mb-32">
				<Link to={"/mentoringDetail/3"}>
					<MentoringItem />
				</Link>
				<Link to={"/mentoringDetail/2"}>
					<MentoringItem />
				</Link>
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
				<MentoringItem />
			</div>
		</>
	);
};

export default MentoringList;
