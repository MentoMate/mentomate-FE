import SignUpForm from "./SignUpForm";

const SignUp = () => {
	return (
		<div className="flex justify-center items-center w-full min-h-screen">
			<div className="flex flex-col w-[24rem] my-12">
				<h1 className="text-2xl font-bold mb-8">회원가입</h1>
				<SignUpForm />
			</div>
		</div>
	);
};

export default SignUp;
