import { lazy } from "react";

const Login = lazy(() => import("../components/login/Login"));

const LoginPage = () => {
	return <Login />;
};

export default LoginPage;
