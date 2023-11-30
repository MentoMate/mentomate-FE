import { ReactComponent as RightArrow } from "@assets/svg/arrow.svg";
import { ReactComponent as Logout } from "@assets/svg/logout.svg";
import Swal from "sweetalert2";
import { removeCookie } from "@/utils/cookies";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/state/loginState";
import { useNavigate } from "react-router-dom";
import { IMyPageListProps } from "@/interface/myPageListProps";

const UserMyPageList = ({
	myPageItems,
	selectedItemIndex,
	setSelectedItemIndex,
}: IMyPageListProps) => {
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
		<div className="flex flex-col items-center sticky top-[8rem] md:mx-0 mx-auto md:ml-8 w-[15rem] h-[38rem] border border-main-color bg-white rounded-md text-sm shadow-md">
			{myPageItems.map((item, index) => (
				<div
					key={index}
					className={`flex justify-between items-center w-[15rem] px-4 hover:bg-purple-100 rounded-[0.3rem] text-center cursor-pointer 
          ${
						selectedItemIndex === index
							? "text-main-color"
							: "text-black hover:text-white"
					} transition duration-150`}
					onClick={() => setSelectedItemIndex(index)}
				>
					<div className="flex items-center">
						{item.icon}
						<div className={"flex p-4 rounded-md"}>{item.label}</div>
					</div>
					<RightArrow className="black" width={10} height={10} />
				</div>
			))}
			<button
				type="button"
				onClick={logoutHandler}
				className="flex items-center mt-2 p-4 w-[15rem] border-black-200 text-center hover:text-white hover:bg-purple-100 rounded-[0.3rem] transition duration-150"
			>
				<Logout width={20} height={20} className="mr-4" />
				로그아웃
			</button>
		</div>
	);
};

export default UserMyPageList;
