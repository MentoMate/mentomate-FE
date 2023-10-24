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
				<label className="mb-2 text-md sm:text-lg font-bold">이메일</label>
				<div className="flex items-center mb-4">
					<input
						type="text"
						className="w-full p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
						placeholder="이메일"
					/>
					<span className="px-1">@</span>
					<input
						type="text"
						className="w-full p-3 border border-black-200 outline-main-color rounded-md"
					/>
				</div>
				<button
					type="button"
					className="py-3 bg-black-300 rounded-md text-md sm:text-lg text-black-200 font-bold"
				>
					이메일 인증
				</button>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-1 text-md sm:text-lg font-bold">비밀번호</label>
				<p className="mb-1 text-black-400 text-[0.7rem] sm:text-[0.8rem]">
					영문, 숫자, 특수문자를 포함한 8~16자리의 비밀번호를 입력해주세요.
				</p>
				<input
					type="password"
					className="p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
					placeholder="비밀번호"
				/>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-md sm:text-lg font-bold">
					비밀번호 확인
				</label>
				<input
					type="password"
					className="p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
					placeholder="비밀번호 확인"
				/>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-md sm:text-lg font-bold">닉네임</label>
				<input
					type="text"
					className="mb-4 p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
					placeholder="닉네임"
				/>
				<button
					type="button"
					className="py-3 bg-black-300 rounded-sm text-md sm:text-lg text-black-200 font-bold"
				>
					닉네임 중복확인
				</button>
			</div>
			<div className="flex flex-col mb-6">
				<label className="mb-2 text-md sm:text-lg font-bold">성별</label>
				<div className="flex border rounded-md">
					<div
						className={`grow py-4 border-r ${
							gender === "men"
								? "bg-main-color text-white"
								: "bg-white hover:bg-main-color text-black hover:text-white"
						} text-center text-lg font-semibold cursor-pointer`}
						onClick={() => onClickGenderHandler("men")}
					>
						남성
					</div>
					<div
						className={`grow py-4 ${
							gender === "female"
								? "bg-main-color text-white"
								: "bg-white text-black hover:bg-main-color hover:text-white"
						} text-center text-lg font-semibold cursor-pointer`}
						onClick={() => onClickGenderHandler("female")}
					>
						여성
					</div>
				</div>
			</div>
			<button
				type="submit"
				className="py-3 bg-main-color text-md sm:text-lg font-bold text-white rounded-sm"
			>
				회원가입
			</button>
		</form>
	);
};

export default SignUpForm;
