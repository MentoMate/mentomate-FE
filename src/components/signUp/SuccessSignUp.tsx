import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "@assets/svg/logoMainColor.svg";

const SuccessSignUp = () => {
	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<Logo width={300} height={70} className="mb-8" />
			<p className="mb-2 sm:text-2xl text-xl font-bold">
				멘토메이트 회원가입을 축하드립니다 !
			</p>
			<p className="mb-12 text-lg">지금 바로 멘토메이트를 이용해보세요.</p>
			<div className="flex">
				<Link
					to="/"
					className="mx-2 p-4 bg-main-color rounded-md text-white font-semibold"
				>
					홈으로 이동
				</Link>
				<Link
					to="/login"
					className="mx-2 p-4 bg-main-color rounded-md text-white font-semibold"
				>
					로그인
				</Link>
			</div>
		</div>
	);
};

export default SuccessSignUp;
