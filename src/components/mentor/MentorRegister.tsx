import { loginState } from "@/state/loginState";
import { ReactComponent as RightArrow } from "@assets/svg/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const MentorRegister = () => {
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

	const isNotLogin = () => {
		sessionStorage.setItem("previousLocation", "/mentorRegistration");
		navigate("/login");
	};

	const clickRegisterMentorHandler = () => {
		isLogin ? navigate("/mentorRegistration") : isNotLogin();
	};

	return (
		<>
			<div className="flex justify-center items-center w-full md:h-[18rem] bg-black-500">
				<div className="flex md:flex-row flex-col items-center md:my-0 my-8">
					<img
						src="src/assets/image/mentoringImage.jpg"
						alt="mentoring"
						className="w-[20rem] h-[16rem]"
					/>
					<div className="md:ml-8 md:my-0 my-8">
						<div className="md:text-lg text-white font-semibold">
							<p className="w-[17rem]">
								지금 멘토가 되어 경험을 나누고 수익을 창출해보세요.
							</p>
							<p className="mt-2">지금 바로 등록해보세요.</p>
						</div>
						<div className="flex md:justify-normal justify-center">
							<button
								type="button"
								onClick={clickRegisterMentorHandler}
								className="flex items-center md:mt-3 mt-8 px-4 py-3 bg-main-color hover:bg-purple-100 rounded-lg text-white font-bold transition-all duration-200"
							>
								멘토 등록
								<RightArrow width={15} height={15} className="ml-2" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MentorRegister;
