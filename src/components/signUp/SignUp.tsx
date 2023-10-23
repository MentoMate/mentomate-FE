import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";

const SignUpForm = lazy(() => import("./SignUpForm"));

const SignUp = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full min-h-screen">
			<Link to={"/"} className="mt-12">
				<Logo width={200} height={100} />
			</Link>
			<div className="flex flex-col w-[17rem] sm:w-[24rem] my-8">
				<h1 className="text-xl sm:text-2xl font-bold mb-8">회원가입</h1>
				<Suspense fallback={<Spinner />}>
					<SignUpForm />
				</Suspense>
			</div>
		</div>
	);
};

export default SignUp;
