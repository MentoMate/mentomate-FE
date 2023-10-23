import { lazy } from "react";

const SignUp = lazy(() => import("../components/signUp/SignUp"));

const SignUpPage = () => {
	return <SignUp />;
};

export default SignUpPage;
