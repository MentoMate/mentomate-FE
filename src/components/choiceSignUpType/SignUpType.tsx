import { ReactComponent as Email } from "@assets/svg/email.svg";
import { ReactComponent as KakaoTalkLogo } from "@assets/svg/kakaoTalkLogo.svg";
import { ReactComponent as NaverLogo } from "@assets/svg/naverLogo.svg";
import { Link } from "react-router-dom";

const SignUpType = () => {
	return (
		<div>
			<Link
				to={"/signUp"}
				className="flex justify-between items-center my-3 py-4 border border-black-200 rounded-md"
			>
				<div className="flex">
					<div className="flex justify-center px-2 w-[4rem]">
						<Email width={30} height={30} />
					</div>
					<div className="px-1 text-sm sm:text-lg font-bold">
						이메일로 회원가입
					</div>
				</div>
				<div className="px-2 text-[0.7rem] sm:text-sm text-black-400">
					이메일과 비밀번호로 회원가입
				</div>
			</Link>

			<div className="flex justify-between items-center my-3 py-4 rounded-md bg-yellow-100">
				<div className="flex">
					<div className="flex justify-center px-2 w-[4rem]">
						<KakaoTalkLogo width={30} height={30} />
					</div>
					{/* <a href={`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`} className="flex justify-center items-center mx-2 w-[3.5rem] h-[3.5rem] bg-yellow-100  rounded-full"> */}
					<a
						href={`https://kauth.kakao.com/oauth/authorize?client_id=32a3e303979a0fb4452018aa4b939e28&redirect_uri=http://localhost:5173/login/oauth2/code/kakao&response_type=code`}
						className="px-1 text-sm sm:text-lg font-bold"
					>
						카카오로 회원가입
					</a>
				</div>
				<div className="px-2 text-[0.7rem] sm:text-sm text-black-400">
					카카오로 인증하여 회원가입
				</div>
			</div>
			<div className="flex flex justify-between items-center my-3 py-4 rounded-md bg-green-100 text-white">
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
	);
};

export default SignUpType;
