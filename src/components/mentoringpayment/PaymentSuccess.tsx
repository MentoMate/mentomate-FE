import { ReactComponent as Checkmark } from "@/assets/svg/checkmark.svg";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-min-height">
			<div className="flex text-2xl font-bold">
				<Checkmark width={40} height={40} className="mr-2" />
				<div>결제가 완료되었습니다.</div>
			</div>
			<Link
				to="/mentoring"
				className="font-bold mt-8 p-4 rounded-md  bg-main-color text-white hover:bg-purple-100 transition duration-200"
			>
				멘토링으로 이동
			</Link>
		</div>
	);
};
export default PaymentSuccess;
