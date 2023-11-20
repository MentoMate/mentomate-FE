import { useLocation, useNavigate } from "react-router-dom";

const BeforeLogin = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const onClickLoginBtnHandler = () => {
		sessionStorage.setItem("previousLocation", location.pathname);
		navigate("/login");
	};

	return (
		<button
			className="flex justify-center items-center px-2 font-semibold text-black-500 hover:text-sky-300"
			onClick={onClickLoginBtnHandler}
		>
			가입/로그인
		</button>
	);
};

export default BeforeLogin;
