import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import SuccessAuthenticationMsg from "@/components/signUp/SuccessAuthenticationMsg";
import { SIGN_UP_SCHEMA } from "@/constants/schema";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Mypageinfo = () => {
	const [isEditMode, setIsEditMode] = useState(false);
	const { fetchDataUseAxios } = useAxios();
	const [userInfo, setUserInfo] = useState();
	const [isNickNameDuplicate, setIsNickNameDuplicate] = useState(false);
	const [text, setText] = useState();

	const {
		setError,
		setFocus,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(SIGN_UP_SCHEMA),
		mode: "onBlur",
	});

	const nickNameDuplicateHandler = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "POST",
			url: `/user/join/email/nickname/verify?nickName=${text}`,
		});

		if (response) {
			console.log(response);
			if (response.status === 200) {
				setIsNickNameDuplicate(true);

				clearErrors("nickName");
			} else if (response.status === 400) {
				setIsNickNameDuplicate(false);
				console.log(response);
				setError("nickName", {
					type: "custom",
					message: "이미 사용중인 닉네임입니다.",
				});
				setFocus("nickName");
			}
		}
	};
	const onClickNicknameChangeHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "put",
			url: `user/nickname/change?nickname=${text}`,
		});
		if (response && response.status === 200) {
			console.log(response.data);
			alertHandler("success", "닉네임 변경 완료 했습니다");
		}
	};
	console.log(text);

	useEffect(() => {
		// 유저 정보를 불러오는 API 호출 (예: GET /user/info)
		const getUserInfoData = async () => {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "GET",
				url: "/user/info",
			});
			if (response && response.status === 200) {
				setUserInfo(response.data);
			}
		};
		getUserInfoData();
	}, []);
	if (!userInfo) {
		return;
	}
	return (
		<div className="flex flex-col items-center mb-24">
			<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full mb-12">
				<img
					src="src/assets/image/sample.jpg"
					alt="sample"
					className="w-full h-full rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-col ">
				<div className="lg:text-base md:text-sm text-black-400">이름</div>
				<div className="w-[15rem] mt-3   text-sm focus:outline-main-color">
					{userInfo.name}
				</div>
				<div className="lg:text-base md:text-sm text-black-400 mt-6">
					이메일
				</div>
				<div className="w-[15rem] mt-3  text-sm focus:outline-main-color">
					{userInfo.email}
				</div>

				{isEditMode ? (
					<>
						<div className="lg:text-base md:text-sm text-black-400 mt-6">
							닉네임
						</div>
						<input
							type="text"
							className="w-[15rem] my-1 p-4 border border-black-200 rounded-md placeholder:text-sm focus:outline-main-color"
							placeholder="닉네임을 변경하세요"
							onChange={(e) => {
								setText(e.target.value);
							}}
						/>
						{isNickNameDuplicate && (
							<SuccessAuthenticationMsg message="닉네임 중복확인 완료" />
						)}
						{errors.nickName && <ErrorMsg message={errors.nickName?.message} />}
						<button
							onClick={nickNameDuplicateHandler}
							className="w-[15rem] mt-2 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm mr-2"
						>
							닉네임 중복 검사
						</button>
						<div className="flex justify-between w-[15rem]">
							<button
								type="submit"
								className="w-[7rem] mt-4 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm mr-2"
								onClick={() => onClickNicknameChangeHandler()}
							>
								저장
							</button>
							<button
								type="submit"
								className="w-[7rem] mt-4 px-3 py-2 bg-red-500 rounded-md font-bold text-white text-sm"
								onClick={() => setIsEditMode(false)}
							>
								취소
							</button>
						</div>
					</>
				) : (
					<>
						<div className="lg:text-base md:text-sm text-black-400 mt-6">
							닉네임
						</div>
						<div className="w-[15rem] mt-3  text-sm focus:outline-main-color">
							{userInfo.nickname}
						</div>

						<button
							className="mt-4 px-3 py-2 bg-main-color rounded-md font-bold text-white text-sm"
							onClick={() => setIsEditMode(true)}
						>
							수정
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Mypageinfo;
