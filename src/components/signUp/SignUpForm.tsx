import { useState } from "react";

const SignUpForm = () => {
	const [gender, setGender] = useState<string>("none");

	const onClickGenderHandler = (genderType: string) => {
		if (gender !== genderType) {
			setGender(genderType);
		}
	};

	return (
		<form className="flex flex-col">
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-lg font-bold">이메일</label>
				<div className="flex items-center mb-4">
					<input
						type="text"
						className="w-full p-3 border border-[#E5E5E5] outline-[#ABDEE6] rounded-md placeholder:text-sm"
						placeholder="이메일"
					/>
					<span className="px-1">@</span>
					<input
						type="text"
						className="w-full p-3 border border-[#E5E5E5] outline-[#ABDEE6] rounded-md"
					/>
				</div>
				<button
					type="button"
					className="py-3 bg-[#B9B9B9] rounded-md text-lg text-[#E5E5E5] font-bold"
				>
					이메일 인증
				</button>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-1 text-lg font-bold">비밀번호</label>
				<p className="mb-1 text-[#8A8A8A] text-[0.8rem]">
					영문, 숫자, 특수문자를 포함한 8~16자리의 비밀번호를 입력해주세요.
				</p>
				<input
					type="password"
					className="p-3 border border-[#E5E5E5] outline-[#ABDEE6] rounded-md placeholder:text-sm"
					placeholder="비밀번호"
				/>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-lg font-bold">비밀번호 확인</label>
				<input
					type="password"
					className="p-3 border border-[#E5E5E5] outline-[#ABDEE6] rounded-md placeholder:text-sm"
					placeholder="비밀번호 확인"
				/>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-lg font-bold">닉네임</label>
				<input
					type="text"
					className="mb-4 p-3 border border-[#E5E5E5] outline-[#ABDEE6] rounded-md placeholder:text-sm"
					placeholder="닉네임"
				/>
				<button
					type="button"
					className="py-3 bg-[#B9B9B9] rounded-sm text-lg text-[#E5E5E5] font-bold"
				>
					닉네임 중복확인
				</button>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-lg font-bold">성별</label>
				<div className="flex border rounded-md">
					<div
						className={`grow py-4 border-r ${
							gender === "men"
								? "bg-[#ABDEE6] text-white"
								: "bg-white hover:bg-[#ABDEE6] text-black hover:text-white"
						} text-center text-lg font-semibold cursor-pointer`}
						onClick={() => onClickGenderHandler("men")}
					>
						남성
					</div>
					<div
						className={`grow py-4 ${
							gender === "female"
								? "bg-[#ABDEE6] text-white"
								: "bg-white text-black hover:bg-[#ABDEE6] hover:text-white"
						} text-center text-lg font-semibold cursor-pointer`}
						onClick={() => onClickGenderHandler("female")}
					>
						여성
					</div>
				</div>
			</div>
			<button
				type="submit"
				className="py-4 bg-[#ABDEE6] text-lg font-bold text-white rounded-sm"
			>
				회원가입
			</button>
		</form>
	);
};

export default SignUpForm;
