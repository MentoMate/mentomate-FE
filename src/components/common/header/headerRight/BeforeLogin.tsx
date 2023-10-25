import { Link } from "react-router-dom";

const BeforeLogin = () => {
	return (
		<Link
			to={"/login"}
			className="flex justify-center items-center px-2 font-semibold"
		>
			가입/로그인
		</Link>
	);
};

export default BeforeLogin;
