import { ReactComponent as Checkmark } from "@/assets/svg/checkmark.svg";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen lg:h-[64.5rem] ">
			<Checkmark className="w-[2rem] sm:w-[3rem] md:w-[5rem] lg:w-[8rem] mb-16" />
			<div className="lg:text-4xl font-bold mb-12">결제가 완료되었습니다.</div>
			<Link to="/mentoring">
				<button className="lg:text-3xl font-bold mt-4 py-6 px-6 rounded-md  bg-main-color text-white">
					멘토링으로 이동
				</button>
			</Link>
		</div>
	);
};
export default PaymentSuccess;
