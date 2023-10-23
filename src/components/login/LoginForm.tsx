const LoginForm = () => {
	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen">
			{/* Logo */}
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
			<div className="">
				<div className="flex justify-center my-8 text-sm text-[#B9B9B9]">
					<div className="mx-1">아직 회원이 아니신가요?</div>
					<div className="mx-1 font-bold">회원가입</div>
				</div>
				<div className="flex flex-col items-center w-[20rem] border-t">
					<div className="mt-4 text-sm text-[#B9B9B9] text-center">
						간편 로그인 / 회원가입
					</div>
					<div className="mt-6">구글 카카오 네이버</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
