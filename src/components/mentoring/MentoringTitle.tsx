import useAxios from "@/hooks/useAxios";
import { loginState } from "@/state/loginState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";

const MentoringTitle = () => {
	const navigate = useNavigate();
	const isLogin = useRecoilValue(loginState);
	const { fetchDataUseAxios } = useAxios();
	const [isMentor, setIsMentor] = useState<boolean>(false);

	const isNotLogin = () => {
		sessionStorage.setItem("previousLocation", "/mentoring");
		navigate("/login");
	};

	const registerClickHandler = () => {
		if (isLogin) {
			if (!isMentor) {
				Swal.fire({
					icon: "question",
					text: "멘토 등록 후 멘토링 등록이 가능합니다. 멘토 등록을 하시겠습니까?",
					showCancelButton: true,
					confirmButtonText: "확인",
					cancelButtonText: "취소",
				}).then((result) => {
					if (result.isConfirmed) {
						navigate("/mentorRegistration");
					}
				});
			} else {
				navigate("/mentoringRegistration");
			}
		} else {
			isNotLogin();
		}
	};

	const getMentorAuth = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/user/profile/mentor",
		});

		if (response) {
			if (response.status === 200) {
				setIsMentor(response.data);
			}
		}
	};

	useEffect(() => {
		if (isLogin) {
			getMentorAuth();
		}
	}, [isLogin]);

	return (
		<div className="flex justify-between items-center mt-6">
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
