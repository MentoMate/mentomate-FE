import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";

const Login = () => {
	return (
		<div className="flex flex-col justify-center items-center w-screen min-h-screen">
			<div className="my-12">
				<Logo width={300} height={70} />
			</div>
			<LoginForm />
			<SocialLogin />
		</div>
	);
};

export default Login;
