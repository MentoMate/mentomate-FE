const LoginForm = () => {
	return (
		<form className="flex flex-col mx-auto w-[15rem] sm:w-[20rem]">
			<input
				type="text"
				className="my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
				placeholder="이메일"
			/>
			<input
				type="text"
				className="my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
				placeholder="비밀번호"
			/>
			<button
				type="submit"
				className="mt-8 px-3 py-4 bg-main-color rounded-md font-bold text-white text-lg"
			>
				로그인
			</button>
		</form>
	);
};

export default LoginForm;
