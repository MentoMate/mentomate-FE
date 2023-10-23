import SignUpForm from "./SignUpForm";
import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";

const SignUp = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full min-h-screen">
			<div className="mt-12">
				<Logo width={200} height={100} />
			</div>
			<div className="flex flex-col w-[17rem] sm:w-[24rem] my-8">
				<h1 className="text-xl sm:text-2xl font-bold mb-8">회원가입</h1>
				<SignUpForm />
			</div>
		</div>
	);
};

export default SignUp;
