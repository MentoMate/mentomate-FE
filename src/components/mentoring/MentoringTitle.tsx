import { loginState } from "@/state/loginState";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const MentoringTitle = () => {
	const navigate = useNavigate();
	const isLogin = useRecoilValue(loginState);

	const registerClickHandler = () => {
		isLogin ? navigate("/mentoringRegistration") : navigate("/login");
	};

	return (
		<div className="flex justify-between items-center mt-6">
			<h1 className="mx-2 text-xl sm:text-2xl font-bold">멘토링 목록</h1>
			<button
				onClick={registerClickHandler}
				className="px-3 py-2 sm:px-4 sm:py-2.5 bg-main-color rounded-lg text-md sm:text-lg font-bold text-white"
			>
				멘토링 등록
			</button>
		</div>
	);
};

export default MentoringTitle;
