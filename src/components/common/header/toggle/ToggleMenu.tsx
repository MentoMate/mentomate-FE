import useLogout from "@/hooks/useLogout";
import { loginState } from "@/state/loginState";
import { cancelLockScroll } from "@/utils/controlBodyScroll";
import { ReactComponent as Logo } from "@assets/svg/Logo.svg";
import { ReactComponent as Close } from "@assets/svg/close.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

interface IProps {
	readonly setIsOpenToggle: (isOpenToggle: boolean) => void;
}

const ToggleMenu = ({ setIsOpenToggle }: IProps) => {
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();
	const { onClickLogoutBtnHandler } = useLogout();

	const onClickLoginHandler = () => {
		cancelLockScroll();
		navigate("/login");
	};

	return (
		<div className="fixed top-0 left-0 px-4 py-4 w-full h-full bg-main-color">
			<div className="flex justify-between">
				<Logo width={100} height={30} fill="white" />
				<Close
					width={30}
					height={30}
					fill="white"
					onClick={() => setIsOpenToggle(false)}
				/>
			</div>
			<div className="flex flex-col items-end mt-6">
				{!isLogin && (
					<p className="mt-4 mr-2 text-white text-right">
						<span
							className="font-bold text-black-500 underline decoration-black-500 underline-offset-1"
							onClick={onClickLoginHandler}
						>
							로그인
						</span>
						후 이용 가능합니다.
					</p>
				)}
				<Link
					to="/"
					className="px-4 py-2 text-white text-lg"
					onClick={() => setIsOpenToggle(false)}
				>
					홈
				</Link>
				<Link
					to="/mentoring"
					className="px-4 py-2 text-white text-lg"
					onClick={() => setIsOpenToggle(false)}
				>
					멘토링
				</Link>
				<Link
					to="/mentor"
					className="px-4 py-2 text-white text-lg"
					onClick={() => setIsOpenToggle(false)}
				>
					멘토
				</Link>
				<Link
					to="/community"
					className="px-4 py-2 text-white text-lg"
					onClick={() => setIsOpenToggle(false)}
				>
					커뮤니티
				</Link>
				{isLogin && (
					<>
						<Link
							to="/userMyPage"
							className="px-4 py-2 text-white text-lg"
							onClick={() => setIsOpenToggle(false)}
						>
							마이페이지
						</Link>
						<button
							type="button"
							onClick={onClickLogoutBtnHandler}
							className="px-4 py-2 text-white text-lg"
						>
							로그아웃
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ToggleMenu;
