import { ReactComponent as GoogleLogo } from "@assets/svg/googleLogo.svg";
import { ReactComponent as KakaoLogo } from "@assets/svg/kakaoTalkLogo.svg";
import { ReactComponent as NaverLogo } from "@assets/svg/naverLogo.svg";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

declare global {
	interface Window {
		naver: any;
	}
}

const SocialLogin = () => {
	return (
		<div className="mb-16">
			<div className="flex justify-center my-8 text-sm text-black-300">
				<div className="mx-1">아직 회원이 아니신가요?</div>
				<Link to={"/choiceSignUpType"} className="mx-1 font-bold">
					회원가입
				</Link>
			</div>
			<div className="flex flex-col items-center w-[20rem] border-t">
				<div className="mt-4 text-sm text-black-300 text-center">
					간편 로그인 / 회원가입
				</div>
				<div className="flex mt-6">
					<a
						href={`https://kauth.kakao.com/oauth/authorize?client_id=32a3e303979a0fb4452018aa4b939e28&redirect_uri=http://localhost:5173/login/oauth2/code/kakao&response_type=code`}
						className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] bg-yellow-100  rounded-full"
					>
						<KakaoLogo width={35} height={35} />
					</a>
					<a
						className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] bg-green-100 rounded-full cursor-pointer"
						href="https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=OrpnAjlttv8YhDER3qSW&state=1234&redirect_uri=http://localhost:5173/login/oauth2/code/naver"
					>
						<NaverLogo width={25} height={25} fill="white" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default SocialLogin;
