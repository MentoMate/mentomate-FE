import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";

const Login = () => {
	return (
		<div className="flex flex-col justify-center items-center w-screen h-screen">
			{/* Logo */}
			<LoginForm />
			<SocialLogin />
		</div>
	);
};

export default Login;
