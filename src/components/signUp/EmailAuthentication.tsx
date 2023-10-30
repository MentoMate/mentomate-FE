import useInput from "@/hooks/useInput";
import { useEffect, useState } from "react";

interface IProps {
	email: string;
	emailDuplicateCheckHandler: (email: string) => void;
}

const MINUTES_IN_MS = 3 * 60 * 1000;
const INTEVAL = 1000;

const EmailAuthentication = ({ email, emailDuplicateCheckHandler }: IProps) => {
	const [authenticationNumber, setAuthenticationNumber] = useInput("");
	const [inputDisabled, setinputDisabled] = useState<boolean>(false);
	const [btnDisabeld, setBtnDisabled] = useState<boolean>(true);
	const [timeLeft, setTimeLeft] = useState<number>(MINUTES_IN_MS);
	const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
		2,
		"0",
	);
	const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => prevTime - INTEVAL);
		}, INTEVAL);

		if (timeLeft <= 0) {
			clearInterval(timer);
			setBtnDisabled(true);
			setinputDisabled(true);
		}

		return () => {
			clearInterval(timer);
		};
	}, [timeLeft]);

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
			<button
				type="button"
				className={`mt-4 py-2 w-[15.5rem] ${
					btnDisabeld ? "bg-black-200" : "bg-main-color"
				} rounded-md text-white font-semiboild`}
				disabled={btnDisabeld}
			>
				인증하기
			</button>
			<p className="pt-4 text-black-400 text-[0.8rem]">
				이메일이 오지 않으셨나요?
				<span
					className="ml-2 font-semibold"
					onClick={() => emailDuplicateCheckHandler(email)}
				>
					이메일 재전송
				</span>
			</p>
		</div>
	);
};

export default EmailAuthentication;
