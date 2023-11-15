import { Link } from "react-router-dom";
interface Iprops {
	mentoringId: number;
}
const Button = ({ mentoringId }: Iprops) => {
	console.log(mentoringId);
	return (
		<div className="flex flex-col mt-2">
			<Link
				className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold"
				to={`/payment/${mentoringId}`}
			>
				멘토링 신청
			</Link>
			<button className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold">
				1:1 문의
			</button>
		</div>
	);
};

export default Button;
