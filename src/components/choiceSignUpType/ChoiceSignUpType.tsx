const ChoiceSignUpType = () => {
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="my-8">로고</div>
			<div className="my-6 text-2xl text-[#ABDEE6] font-bold">
				회원가입 후 다양한 서비스를 즐겨보세요.
			</div>
			<div>
				<div className="flex flex-col w-[30rem] border-t border-[#8A8A8A]">
					<div className="flex justify-center my-8">
						<div className="mx-1">체크</div>
						<div className="mx-1 text-2xl font-bold">
							회원가입 방식을 선택해주세요.
						</div>
					</div>
					<div>
						<div className="flex justify-between items-center my-3 py-4 border border-[#E5E5E5] rounded-md">
							<div className="flex">
								<div className="px-2 w-[4rem]">이메일</div>
								<div className="px-1 text-lg font-bold">이메일로 회원가입</div>
							</div>
							<div className="px-2 text-sm text-[#8A8A8A]">
								이메일과 비밀번호로 회원가입
							</div>
						</div>
						<div className="flex justify-between items-center my-3 py-4 border border-[#E5E5E5] rounded-md">
							<div className="flex">
								<div className="px-2 w-[4rem]">구글</div>
								<div className="px-1 text-lg font-bold">Google로 회원가입</div>
							</div>
							<div className="px-2 text-sm text-[#8A8A8A]">
								Google로 인증하여 회원가입
							</div>
						</div>
						<div className="flex justify-between items-center my-3 py-4 rounded-md bg-[#FEE500]">
							<div className="flex">
								<div className="px-2 w-[4rem]">카카오</div>
								<div className="px-1 text-lg font-bold">카카오로 회원가입</div>
							</div>
							<div className="px-2 text-sm text-[#8A8A8A]">
								카카오로 인증하여 회원가입
							</div>
						</div>
						<div className="flex flex justify-between items-center my-3 py-4 rounded-md bg-[#03C75A] text-white">
							<div className="flex">
								<div className="px-2 w-[4rem]">네이버</div>
								<div className="px-1 text-lg font-bold">네이버로 회원가입</div>
							</div>
							<div className="px-2 text-sm">네이버로 인증하여 회원가입</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChoiceSignUpType;
