import { lazy, Suspense } from "react";
import { ReactComponent as Logo } from "@assets/svg/logoMainColor.svg";
import { Link } from "react-router-dom";
import Spinner from "@components/common/spinner/Spinner";

const LoginForm = lazy(() => import("./LoginForm"));
const SocialLogin = lazy(() => import("./SocialLogin"));

const LoginContainer = () => {
	return (
		<div className="flex flex-col justify-center items-center w-screen min-h-screen">
			<Link to={"/"} className="my-12">
				<Logo width={300} height={70} />
			</Link>
			<Suspense fallback={<Spinner />}>
				<LoginForm />
				<SocialLogin />
			</Suspense>
		</div>
	);
};

export default LoginContainer;
