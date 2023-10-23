import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { ReactComponent as CheckMark } from "../../assets/svg/checkmark.svg";
import { ReactComponent as Email } from "../../assets/svg/email.svg";
import { ReactComponent as GoogleLogo } from "../../assets/svg/googleLogo.svg";
import { ReactComponent as KakaoTalkLogo } from "../../assets/svg/kakaoTalkLogo.svg";
import { ReactComponent as NaverLogo } from "../../assets/svg/naverLogo.svg";

const ChoiceSignUpType = () => {
	return (
		<div className="flex flex-col items-center md:mt-20 sm:mt-12 min-h-screen">
			<div className="my-16">
				<Logo className="w-[15rem] h-[5rem]" />
			</div>
			<div className="mb-6 sm:text-2xl text-sm text-[#ABDEE6] font-bold">
				회원가입 후 다양한 서비스를 즐겨보세요.
			</div>
			<div>
				<div className="flex flex-col w-[15rem] sm:w-[30rem] border-t border-[#E5E5E5]">
					<div className="flex justify-center my-8">
						<div className="flex items-center mx-1">
							<CheckMark width={20} height={20} />
						</div>
						<div className="mx-1 text-sm sm:text-2xl font-bold">
							회원가입 방식을 선택해주세요.
						</div>
					</div>
					<div>
						<div className="flex justify-between items-center my-3 py-4 border border-[#E5E5E5] rounded-md">
							<div className="flex">
								<div className="flex justify-center px-2 w-[4rem]">
									<Email width={30} height={30} />
								</div>
								<div className="px-1 text-sm sm:text-lg font-bold">
									이메일로 회원가입
								</div>
							</div>
							<div className="px-2 text-[0.7rem] sm:text-sm text-[#8A8A8A]">
								이메일과 비밀번호로 회원가입
							</div>
						</div>
						<div className="flex justify-between items-center my-3 py-4 border border-[#E5E5E5] rounded-md">
							<div className="flex">
								<div className="flex justify-center px-2 w-[4rem]">
									<GoogleLogo width={30} height={30} />
								</div>
								<div className="px-1 text-sm sm:text-lg font-bold">
									<span className="text-[0.8rem] sm:text-[1rem]">Google</span>로
									회원가입
								</div>
							</div>
							<div className="px-2 text-[0.7rem] sm:text-sm text-[#8A8A8A]">
								Google로 인증하여 회원가입
							</div>
						</div>
						<div className="flex justify-between items-center my-3 py-4 rounded-md bg-[#FEE500]">
							<div className="flex">
								<div className="flex justify-center px-2 w-[4rem]">
									<KakaoTalkLogo width={30} height={30} />
								</div>
								<div className="px-1 text-sm sm:text-lg font-bold">
									카카오로 회원가입
								</div>
							</div>
							<div className="px-2 text-[0.7rem] sm:text-sm text-[#8A8A8A]">
								카카오로 인증하여 회원가입
							</div>
						</div>
						<div className="flex flex justify-between items-center my-3 py-4 rounded-md bg-[#03C75A] text-white">
							<div className="flex">
								<div className="flex justify-center items-center px-2 w-[4rem]">
									<NaverLogo width={20} height={20} fill="white" />
								</div>
								<div className="px-1 text-sm sm:text-lg font-bold">
									네이버로 회원가입
								</div>
							</div>
							<div className="px-2 text-[0.7rem] sm:text-sm">
								네이버로 인증하여 회원가입
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChoiceSignUpType;
