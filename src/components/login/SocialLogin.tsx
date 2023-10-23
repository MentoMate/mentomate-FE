import { ReactComponent as GoogleLogo } from "../../assets/svg/googleLogo.svg";
import { ReactComponent as KakaoLogo } from "../../assets/svg/kakaoTalkLogo.svg";
import { ReactComponent as NaverLogo } from "../../assets/svg/naverLogo.svg";

const SocialLogin = () => {
	return (
		<div className="mb-16">
			<div className="flex justify-center my-8 text-sm text-[#B9B9B9]">
				<div className="mx-1">아직 회원이 아니신가요?</div>
				<div className="mx-1 font-bold">회원가입</div>
			</div>
			<div className="flex flex-col items-center w-[20rem] border-t">
				<div className="mt-4 text-sm text-[#B9B9B9] text-center">
					간편 로그인 / 회원가입
				</div>
				<div className="flex mt-6">
					<div className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] border border-[#E5E5E5] rounded-full">
						<GoogleLogo width={40} height={40} />
					</div>
					<div className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] bg-[#FEE500]  rounded-full">
						<KakaoLogo width={35} height={35} />
					</div>
					<div className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] bg-[#03C75A]  rounded-full">
						<NaverLogo width={25} height={25} fill="white" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default SocialLogin;
