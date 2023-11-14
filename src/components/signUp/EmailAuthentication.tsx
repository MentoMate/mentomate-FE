import { useFetch } from "@/hooks/useFetch";
import useInput from "@/hooks/useInput";
import { useEffect, useState } from "react";
import ErrorMsg from "../common/errorMsg/ErrorMsg";

interface IProps {
	readonly email: string;
	readonly emailDuplicateCheckHandler: (email: string) => void;
	readonly timeLeft: number;
	readonly setTimeLeft: (time: number | ((time: number) => number)) => void;
	readonly isEmailAuthentication: boolean;
	readonly setIsEmailAuthentication: (authenticate: boolean) => void;
}

const INTERVAL = 1000;

const EmailAuthentication = ({
	email,
	emailDuplicateCheckHandler,
	timeLeft,
	setTimeLeft,
	isEmailAuthentication,
	setIsEmailAuthentication,
}: IProps) => {
	const { fetchCall } = useFetch();
	const [authenticationNumber, setAuthenticationNumber] = useInput("");
	const [inputDisabled, setInputDisabled] = useState<boolean>(false);
	const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
	const [errorMsg, setErrorMsg] = useState<string>("");
	const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
		2,
		"0",
	);
	const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

	const emailAuthenticationHandler = async () => {
		const response = await fetchCall(
			`/api/user/join/email/auth/verify?authCode=${authenticationNumber}&email=${email}`,
			{
				method: "POST",
			},
		);

		if (response) {
			if (response.status === 200) {
				setIsEmailAuthentication(true);
				setInputDisabled(true);
				setBtnDisabled(true);
				setErrorMsg("");
			}

			if (response.status === 400) {
				setErrorMsg("인증번호가 일치하지 않습니다.");
			}
		}
	};

	const resendEmailAuthentication = () => {
		emailDuplicateCheckHandler(email);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev: number) => prev - INTERVAL);
		}, INTERVAL);

		if (timeLeft <= 0) {
			clearInterval(timer);
			setBtnDisabled(true);
			setInputDisabled(true);
		}

		return () => {
			clearInterval(timer);
		};
	}, [timeLeft]);

	useEffect(() => {
		isEmailAuthentication ? setInputDisabled(true) : setInputDisabled(false);
	}, [isEmailAuthentication]);

	useEffect(() => {
		if (authenticationNumber.length !== 0 && authenticationNumber !== "") {
			setBtnDisabled(false);
		} else {
			setBtnDisabled(true);
		}
	}, [authenticationNumber]);

	return (
		<div className="flex flex-col justify-center items-center mb-6 py-4 w-full bg-black-100 rounded-md">
			<p className="mb-3 text-sm">제한시간 안에 인증번호를 입력해주세요.</p>
			<div className="flex items-center">
				<input
					type="text"
					className={`p-2 sm:w-full w-[11rem]  ${
						inputDisabled ? "bg-black-200" : "bg-white"
					} border placeholder:text-sm text-sm rounded-md outline-none`}
					placeholder="인증번호를 입력하세요."
					onChange={setAuthenticationNumber}
					maxLength={6}
					disabled={inputDisabled}
				/>
				<div className="ml-2 text-red-100">
					{minutes}:{second}
				</div>
			</div>
			{errorMsg.length !== 0 && <ErrorMsg message={errorMsg} />}
			<button
				type="button"
				className={`mt-4 py-2 w-[15.5rem] ${
					btnDisabled ? "bg-black-200" : "bg-main-color"
				} rounded-md text-white font-semibold`}
				disabled={btnDisabled}
				onClick={emailAuthenticationHandler}
			>
				인증하기
			</button>
			<p className="pt-4 text-black-400 text-[0.8rem]">
				이메일이 오지 않으셨나요?
				<span
					className="ml-2 font-semibold cursor-pointer"
					onClick={resendEmailAuthentication}
				>
					이메일 재전송
				</span>
			</p>
		</div>
	);
};

export default EmailAuthentication;
