import { SIGN_UP_SCHEMA } from "@/constants/schema";
import { useFetch } from "@/hooks/useFetch";
import useInput from "@/hooks/useInput";
import { alertHandler } from "@/utils/alert";
import { cancelLockScroll, lockScroll } from "@/utils/controlBodyScroll";
import { checkRegex } from "@/utils/regex";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import Loading from "@components/common/spinner/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import EmailAuthentication from "./EmailAuthentication";
import SuccessAuthenticationMsg from "./SuccessAuthenticationMsg";
import useAxios from "@/hooks/useAxios";

interface IFormValues {
	readonly email: string;
	readonly password: string;
	readonly checkPassword: string;
	readonly nickName: string;
}

const SignUpForm = () => {
	const navigate = useNavigate();
	const { fetchCall, isLoading, isError } = useFetch();
	const { fetchDataUseAxios } = useAxios();
	const [email, setEmail] = useInput("");
	const [nickName, setNickName] = useInput("");
	const [isBtnEmailDuplicateDisabled, setIsBtnEmailDuplicateDisabled] =
		useState<boolean>(true);
	const [isBtnNickNameDuplicateDisabled, setBtnNickNameDuplicateDisabled] =
		useState<boolean>(true);
	const [isEmailDuplicate, setIsEmailDuplicate] = useState<boolean>(false);
	const [isEmailAuthenticataion, setIsEmailAuthentication] =
		useState<boolean>(false);
	const [isNickNameDuplicate, setIsNickNameDuplicate] =
		useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(3 * 60 * 1000);
	const {
		register,
		handleSubmit,
		getValues,
		setError,
		setFocus,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SIGN_UP_SCHEMA),
		mode: "onBlur",
	});

	const submitHandler = async (data: IFormValues) => {
		if (!isEmailDuplicate || !isEmailAuthenticataion || !isNickNameDuplicate) {
			if (!isEmailDuplicate) {
				setError("email", {
					type: "custom",
					message: "이메일 중복체크를 해주세요.",
				});
				setFocus("email");
			}

			if (!isEmailAuthenticataion) {
				setError("email", {
					type: "custom",
					message: "이메일 인증을 해주세요.",
				});
				setFocus("email");
			}

			if (!isNickNameDuplicate) {
				setError("nickName", {
					type: "custom",
					message: "닉네임 중복체크를 해주세요.",
				});
				setFocus("nickName");
			}
			return;
		}

		const response = await fetchDataUseAxios("defaultAxios", {
			method: "POST",
			url: "/user/join/email",
			data: {
				email: data.email,
				password: data.password,
				nickName: data.nickName,
			},
		});

		if (response && response.status === 200) {
			navigate("/successSignUp");
		}
	};

	const emailDuplicateCheckHandler = async () => {
		const email = getValues("email");

		const response = await fetchDataUseAxios("defaultAxios", {
			method: "POST",
			url: `/user/join/email/auth?email=${email}`,
		});

		if (response && response.status === 200) {
			setIsEmailDuplicate(true);
			setIsBtnEmailDuplicateDisabled(true);
			setIsEmailAuthentication(false);
			setTimeLeft(3 * 60 * 1000);
			clearErrors("email");
		}
	};

	const nickNameDuplicateHandler = async () => {
		const response = await fetchDataUseAxios("default", {
			method: "POST",
			url: `/user/join/email/nickname/verify?nickname=${nickName}`,
		});

		if (response && response.status === 200) {
			setIsNickNameDuplicate(true);
			setBtnNickNameDuplicateDisabled(true);
			clearErrors("nickName");
		}
	};

	const onKeyUpHandler = (type: string) => {
		if (type === "email") {
			setIsEmailDuplicate(false);
			setIsEmailAuthentication(false);
		}

		if (type === "nickName") {
			setIsNickNameDuplicate(false);
		}
	};

	useEffect(() => {
		isLoading ? lockScroll() : cancelLockScroll();
	}, [isLoading]);

	useEffect(() => {
		checkRegex("email", email);

		if (email !== null && email.length !== 0 && checkRegex("email", email)) {
			setIsBtnEmailDuplicateDisabled(false);
		} else {
			setIsBtnEmailDuplicateDisabled(true);
		}
	}, [email]);

	useEffect(() => {
		isEmailAuthenticataion
			? setIsBtnEmailDuplicateDisabled(true)
			: setIsBtnEmailDuplicateDisabled(false);
	}, [isEmailAuthenticataion]);

	useEffect(() => {
		if (nickName === "" && nickName.length === 0) {
			setBtnNickNameDuplicateDisabled(true);
		} else {
			setBtnNickNameDuplicateDisabled(false);
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
			<form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
				<div className="flex flex-col mb-6">
					<label className="flex items-center mb-2 text-md sm:text-lg font-bold">
						이메일
					</label>
					<div className="flex items-center">
						<input
							type="text"
							className="p-3 w-full border border-black-200 outline-main-color rounded-md placeholder:text-sm"
							placeholder="이메일"
							{...register("email")}
							onChange={setEmail}
							onKeyDown={() => onKeyUpHandler("email")}
						/>
					</div>
					{isEmailAuthenticataion && (
						<SuccessAuthenticationMsg message="이메일 인증 완료" />
					)}
					{errors.email && <ErrorMsg message={errors.email?.message} />}
					<button
						type="button"
						className={`mt-4 py-3 rounded-md text-md sm:text-lg font-bold ${
							isBtnEmailDuplicateDisabled
								? "bg-black-300 text-black-200"
								: "bg-main-color text-white"
						}`}
						onClick={emailDuplicateCheckHandler}
						disabled={isBtnEmailDuplicateDisabled}
					>
						이메일 인증
					</button>
				</div>
				{isEmailDuplicate && !isEmailAuthenticataion && (
					<EmailAuthentication
						email={email}
						emailDuplicateCheckHandler={emailDuplicateCheckHandler}
						timeLeft={timeLeft}
						setTimeLeft={setTimeLeft}
						isEmailAuthenticataion={isEmailAuthenticataion}
						setIsEmailAuthentication={setIsEmailAuthentication}
					/>
				)}
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
					<label className="flex items-center mb-2 text-md sm:text-lg font-bold">
						닉네임
					</label>
					<input
						type="text"
						className=" p-3 border border-black-200 outline-main-color rounded-md placeholder:text-sm"
						placeholder="닉네임"
						{...register("nickName")}
						onChange={setNickName}
						onKeyDown={() => onKeyUpHandler("nickName")}
					/>
					{isNickNameDuplicate && (
						<SuccessAuthenticationMsg message="닉네임 중복확인 완료" />
					)}
					{errors.nickName && <ErrorMsg message={errors.nickName?.message} />}
					<button
						type="button"
						className={`mt-4 py-3 rounded-sm text-md sm:text-lg font-bold ${
							isBtnNickNameDuplicateDisabled
								? "bg-black-300 text-black-200"
								: "bg-main-color text-white"
						}`}
						disabled={isBtnNickNameDuplicateDisabled}
						onClick={nickNameDuplicateHandler}
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
