import SocialLogin from "./SocialLogin";

const LoginForm = () => {
	return (
		<form className="flex flex-col mx-auto w-[20rem]">
			<input
				type="text"
				className="my-1 p-4 border border-[#E5E5E5] rounded-md placeholder:text-sm focus:outline-[#ABDEE6]"
				placeholder="이메일"
			/>
			<input
				type="text"
				className="my-1 p-4 border border-[#E5E5E5] rounded-md placeholder:text-sm focus:outline-[#ABDEE6]"
				placeholder="비밀번호"
			/>
			<button
				type="submit"
				className="mt-8 px-3 py-4 bg-[#ABDEE6] rounded-md font-bold text-white text-lg"
			>
				로그인
			</button>
		</form>
	);
};

export default LoginForm;
