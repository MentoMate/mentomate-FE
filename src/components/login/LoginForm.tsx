import { LOGIN_SCHEMA } from "@/constants/schema";
import useAxios from "@/hooks/useAxios";
import { loginState } from "@/state/loginState";
import { setCookie } from "@/utils/cookies";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import Loading from "@components/common/spinner/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface ILoginFormValues {
	readonly email: string;
	readonly password: string;
}

const LoginForm = () => {
	const navigate = useNavigate();
	const setLoginState = useSetRecoilState(loginState);
	const { isLoading, fetchDataUseAxios } = useAxios();
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(LOGIN_SCHEMA),
		mode: "onBlur",
	});

	const submitHandler = async (data: ILoginFormValues) => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url: "/login",
			method: "POST",
			data: {
				email: data.email,
				password: data.password,
			},
		});

		if (response) {
			if (response.status === 200) {
				setCookie("accessToken", response.headers.authorization);
				setCookie("refreshToken", response.headers["authorization-refresh"]);
				setLoginState(true);

				const previousLocation = sessionStorage.getItem("previousLocation");
				if (previousLocation !== null) {
					navigate(previousLocation);
				}
			}

			if (response.status === 400) {
				setError("password", {
					type: "custom",
					message: "이메일 또는 비밀번호를 확인해주세요.",
				});
			}
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
						errors.email
							? "border-red-100 focus:outline-red-100"
							: "focus:outline-main-color"
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
							? "border-red-100 focus:outline-red-100"
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
