import { ReactComponent as RightArrow } from "@assets/svg/arrow.svg";
import { ReactComponent as Logout } from "@assets/svg/logout.svg";
import { ImyPageListProps } from "@/types/mypagelistprop";
import Swal from "sweetalert2";
import { removeCookie } from "@/utils/cookies";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/state/loginState";
import { useNavigate } from "react-router-dom";

const MypageList = ({
	myPageItems,
	selectedItemIndex,
	setSelectedItemIndex,
}: ImyPageListProps) => {
	const navigate = useNavigate();

	const setLoginState = useSetRecoilState(loginState);
	const logoutHandler = () => {
		Swal.fire({
			icon: "question",
			text: "로그아웃 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				removeCookie();
				setLoginState(false);
				navigate("/");
			}
		});
	};
	return (
		<div className="flex flex-col items-center sticky top-[8rem] md:mx-0 mx-auto md:ml-8 w-[18rem] h-[53rem] border border-black-200 bg-black-100 rounded-md">
			{myPageItems.map((item, index) => (
				<div
					key={index}
					className={`flex justify-between items-center w-[18rem] px-4 block hover:bg-blue-100  rounded-md text-center mt-4 cursor-pointer ${
						selectedItemIndex === index ? "text-blue-500" : "text-black"
					}`}
					onClick={() => setSelectedItemIndex(index)}
				>
					{item.icon}
					<a
						className={`block p-4 rounded-md  ${
							selectedItemIndex === index ? "text-blue-500" : "text-black"
						}`}
					>
						{item.label}
					</a>
					<RightArrow className="black" width={10} height={10} />
				</div>
			))}
			<div className="flex border-t-2 border-black-200 items-center w-[18rem] px-4 block text-center hover:bg-blue-100 mt-12 ">
				<Logout width={20} height={20} />
				<div
					onClick={logoutHandler}
					className="block p-4 text-center hover-bg-blue-100"
				>
					로그아웃
				</div>
			</div>
		</div>
	);
};

export default MypageList;
