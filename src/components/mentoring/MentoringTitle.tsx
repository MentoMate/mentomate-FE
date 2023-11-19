import { loginState } from "@/state/loginState";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const MentoringTitle = () => {
	const navigate = useNavigate();
	const isLogin = useRecoilValue(loginState);

	const isNotLogin = () => {
		sessionStorage.setItem("previousLocation", "/mentoringRegistration");
		navigate("/login");
	};

	const registerClickHandler = () => {
		isLogin ? navigate("/mentoringRegistration") : isNotLogin();
	};

	return (
		<div className="pt-20 flex justify-between items-center mt-6">
			<h1 className="mx-2 text-xl sm:text-lg font-bold text-black-500">
				멘토링 목록
			</h1>
			<button
				onClick={registerClickHandler}
				className="p-3 bg-main-color hover:bg-purple-100 rounded-lg font-semibold text-sm text-white"
			>
				멘토링 등록
			</button>
		</div>
	);
};

export default MentoringTitle;
