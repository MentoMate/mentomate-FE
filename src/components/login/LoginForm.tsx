import { LOGIN_SCHEMA } from "@/constants/schema";
import { useFetch } from "@/hooks/useFetch";
import { loginState } from "@/state/loginState";
import { setCookie } from "@/utils/cookies";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import Loading from "@components/common/spinner/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface ILoginFormValues {
	email: string;
	password: string;
}

const LoginForm = () => {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);
	const { isError, fetchCall, isLoading } = useFetch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LOGIN_SCHEMA),
		mode: "onBlur",
	});

	const submitHandler = async (data: ILoginFormValues) => {
		const response = await fetchCall("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		});

		if (response && response.status === 200) {
			setCookie("accessToken", response.headers.get("Authorization"));
			setCookie("refreshToken", response.headers.get("Authorization-refresh"));
			setLoginState(true);
			navigate("/");
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(submitHandler)}
				className="flex flex-col mx-auto w-[15rem] sm:w-[20rem]"
			>
				<input
					type="text"
					className={`my-1 p-4 border border-black-200 rounded-md placeholder:text-sm ${
						errors.email ? "focus:outline-red-100" : "focus:outline-main-color"
					}`}
					placeholder="이메일"
					{...register("email")}
				/>
				{errors.email && <ErrorMsg message={errors.email?.message} />}
				<input
					id="password"
					type="password"
					className={`my-1 p-4 border border-black-200 rounded-md placeholder:text-sm ${
						errors.password
							? "focus:outline-red-100"
							: "focus:outline-main-color"
					}`}
					placeholder="비밀번호"
					{...register("password")}
				/>
				{errors.password && <ErrorMsg message={errors.password?.message} />}
				<button
					type="submit"
					className="mt-8 px-3 py-4 bg-main-color rounded-md font-bold text-white text-lg"
				>
					로그인
				</button>
			</form>
			{isLoading && <Loading />}
		</>
	);
};

export default LoginForm;
