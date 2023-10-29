import { SIGN_UP_SCHEMA } from "@/constants/schema";
import { useFetch } from "@/hooks/useFetch";
import useInput from "@/hooks/useInput";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import Loading from "@components/common/spinner/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormValues {
	readonly email: string;
	readonly password: string;
	readonly checkPassword: string;
	readonly nickName: string;
}

const SignUpForm = () => {
	const navigate = useNavigate();
	const { fetchCall, isLoading, isError } = useFetch();
	const [email, onChangeEmail] = useInput(null);
	const [nickName, onChangeNickName] = useInput(null);
	const [isEmailDuplicateDisabled, setIsEmailDuplicateDisabled] =
		useState<boolean>(true);
	const [isNickNameDuplicateDisabled, setNickNameDuplicateDisabled] =
		useState<boolean>(true);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SIGN_UP_SCHEMA),
		mode: "onBlur",
	});

	const onClickSubmitHandler = async (data: IFormValues) => {
		const response = await fetchCall("/api/user/join/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
				nickName: data.nickName,
			}),
		});

		if (response && response.status === 200) {
			navigate("/");
		}
	};

	const emailDuplicateCheckHandler = async () => {
		const email = getValues("email");

		await fetchCall(`/api/user/join/email/auth?email=${email}`, {
			method: "post",
		});
	};

	useEffect(() => {
		isLoading ? lockScroll() : cancelLockScroll();
	}, [isLoading]);

	useEffect(() => {
		if (email !== null && email.length !== 0) {
			setIsEmailDuplicateDisabled(false);
		} else {
			setIsEmailDuplicateDisabled(true);
		}
	}, [email]);

	useEffect(() => {
		if (nickName === null || nickName.length === 0) {
			setNickNameDuplicateDisabled(true);
		} else {
			setNickNameDuplicateDisabled(false);
		}
	}, [nickName]);

	useEffect(() => {
		if (isError) {
			alertHandler(
				"warning",
				"회원가입이 정상적으로 등록되지 않았습니다. 잠시후에 다시 시도해주세요.",
			);
		}
	}, [isError]);

	return (
		<>
			<form
				onSubmit={handleSubmit(onClickSubmitHandler)}
				className="flex flex-col"
			>
				<div className="flex flex-col mb-6">
					<label className="mb-2 text-md sm:text-lg font-bold">이메일</label>
					<div className="flex items-center">
						<input
							type="text"
							className="p-3 w-full border border-black-200 outline-main-color rounded-md placeholder:text-sm"
							placeholder="이메일"
							{...register("email")}
							onChange={onChangeEmail as ChangeEventHandler<HTMLInputElement>}
						/>
					</div>
					{errors.email && <ErrorMsg message={errors.email?.message} />}
					<button
						type="button"
						className={`mt-4 py-3 rounded-md text-md sm:text-lg font-bold ${
							isEmailDuplicateDisabled
								? "bg-black-300 text-black-200"
								: "bg-main-color text-white"
						}`}
						onClick={emailDuplicateCheckHandler}
						disabled={isEmailDuplicateDisabled}
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
						{...register("password")}
					/>
					{errors.password && <ErrorMsg message={errors.password?.message} />}
				</div>
				<div className="flex flex-col mb-6">
					<label className="mb-2 text-md sm:text-lg font-bold">
						비밀번호 확인
					</label>
					<input
						type="password"
						className="p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
						placeholder="비밀번호 확인"
						{...register("checkPassword")}
					/>
					{errors.checkPassword && (
						<ErrorMsg message={errors.checkPassword?.message} />
					)}
				</div>
				<div className="flex flex-col mb-6">
					<label className="mb-2 text-md sm:text-lg font-bold">닉네임</label>
					<input
						type="text"
						className=" p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
						placeholder="닉네임"
						{...register("nickName")}
						onChange={onChangeNickName as ChangeEventHandler<HTMLInputElement>}
					/>
					{errors.nickName && <ErrorMsg message={errors.nickName?.message} />}
					<button
						type="button"
						className={`mt-4 py-3 rounded-sm text-md sm:text-lg font-bold ${
							isNickNameDuplicateDisabled
								? "bg-black-300 text-black-200"
								: "bg-main-color text-white"
						}`}
						disabled={isNickNameDuplicateDisabled}
					>
						닉네임 중복확인
					</button>
				</div>
				<button
					type="submit"
					className="mt-16 py-3 bg-main-color text-md sm:text-lg font-bold text-white rounded-sm"
				>
					회원가입
				</button>
			</form>
			{isLoading && <Loading />}
		</>
	);
};

export default SignUpForm;
