import { ReactComponent as Alert } from "../../../../assets/svg/alert.svg";

const AfterLogin = () => {
	return (
		<div className="flex justify-center items-center font-semibold">
			<div className="mx-2">마이페이지</div>
			<div className="mx-2">로그아웃</div>
			<div className="relative px-2">
				<Alert width={25} />
				<div className="absolute top-[-0.6rem] right-0 w-6 h-6 bg-red-100 rounded-2xl text-center text-white text-sm">
					0
				</div>
			</div>
		</div>
	);
};

export default AfterLogin;
