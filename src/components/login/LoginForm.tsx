import { useFetch } from "@/hooks/useFetch";
import ErrorMsg from "@components/common/errorMsg/ErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Loading from "../common/spinner/Loading";

export type FormValues = {
	email: string;
	password: string;
};

const schema = yup.object().shape({
	email: yup.string().required("이메일을 입력하세요."),
	password: yup.string().required("비밀번호를 입력하세요."),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });
	const { loading, fetchData } = useFetch();

	const submitHandler = (e: FormValues) => {
		fetchData("/api/login", {
			method: "POST",
			body: { email: e.email, password: e.password },
		});
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
			{loading && <Loading />}
		</>
	);
};

export default LoginForm;
