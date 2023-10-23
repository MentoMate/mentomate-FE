import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";
import { ReactComponent as CheckMark } from "../../assets/svg/checkmark.svg";
import SignUpType from "./SignUpType";

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
					<SignUpType />
				</div>
			</div>
		</div>
	);
};

export default ChoiceSignUpType;
