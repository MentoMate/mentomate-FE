import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { ReactComponent as CheckMark } from "../../assets/svg/checkmark.svg";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../common/spinner/Spinner";

const SignUpType = lazy(() => import("./SignUpType"));

const ChoiceSignUpType = () => {
	return (
		<div className="flex flex-col items-center md:mt-20 sm:mt-12 min-h-screen">
			<Link to={"/"} className="my-16">
				<Logo className="w-[15rem] h-[5rem]" />
			</Link>
			<div className="mb-6 sm:text-2xl text-sm text-main-color font-bold">
				회원가입 후 다양한 서비스를 즐겨보세요.
			</div>
			<div>
				<div className="flex flex-col w-[15rem] sm:w-[30rem] border-t border-black-200">
					<div className="flex justify-center my-8">
						<div className="flex items-center mx-1">
							<CheckMark width={20} height={20} />
						</div>
						<div className="mx-1 text-sm sm:text-2xl font-bold">
							회원가입 방식을 선택해주세요.
						</div>
					</div>
					<Suspense fallback={<Spinner />}>
						<SignUpType />
					</Suspense>
				</div>
			</div>
			<div className="flex mt-8 mb-16 sm:text-md text-[0.8rem]">
				<div className="mx-1">이미 계정이 있으신가요?</div>
				<Link to={"/login"} className="mx-1 font-bold">
					로그인
				</Link>
			</div>
		</div>
	);
};

export default ChoiceSignUpType;
