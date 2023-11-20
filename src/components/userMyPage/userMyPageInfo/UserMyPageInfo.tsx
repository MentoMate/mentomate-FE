import ErrorMsg from "@/components/common/errorMsg/ErrorMsg";
import SuccessAuthenticationMsg from "@/components/signUp/SuccessAuthenticationMsg";
import { SIGN_UP_SCHEMA } from "@/constants/schema";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as MyEdit } from "@assets/svg/myEdit.svg";

interface INickname {
	readonly email: string;
	readonly name: string;
	readonly nickname: string;
	readonly uploadUrl: string;
}

const UserMyPageInfo = () => {
	const [isEditMode, setIsEditMode] = useState(false);
	const { fetchDataUseAxios } = useAxios();
	const [userInfo, setUserInfo] = useState<INickname>();
	const [isNickNameDuplicate, setIsNickNameDuplicate] = useState(false);
	const [text, setText] = useState<string>();
	const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);
	const [userImg, setUserImg] = useState<null | File>();
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
			response;
			if (response.status === 200) {
				setIsNickNameDuplicate(true);

				clearErrors("nickName");
			} else if (response.status === 400) {
				setIsNickNameDuplicate(false);
				response;
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
			response.data;
			alertHandler("success", "닉네임 변경 완료 했습니다");
			getUserInfoData();
		}
	};
	text;
	const getUserInfoData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/user/info",
		});
		if (response && response.status === 200) {
			response.data;
			setUserInfo(response.data);
		}
	};

	const makePreviewImgHandler = (thumbNailImgFile: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(thumbNailImgFile);

		reader.onload = (e) => {
			if (e.target !== null) {
				setPreviewImg(e.target.result as string);
			}
		};
	};

	const onChangeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			if (e.currentTarget.files.length === 0) return;

			const profileImgFile = e.currentTarget.files[0];
			makePreviewImgHandler(profileImgFile);
			profileImgFile;
			if (profileImgFile) {
				setUserImg(profileImgFile);
			}
		}
	};
	const onClickEditProfile = async () => {
		if (userImg) {
			const formData = new FormData();
			formData.append("img", userImg);
			userImg;
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "PUT",
				url: "/user/img",
				data: formData,
			});

			if (response && response.status === 200) {
				response;
				alertHandler("success", "프로필이 변경되었습니다.");
			} else {
				response;
			}
		}
	};

	useEffect(() => {
		getUserInfoData();
	}, []);
	if (!userInfo) {
		return;
	}
	return (
		<div className="flex flex-col items-center mb-24">
			<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full mb-20 relative">
				<img
					src={previewImg ? previewImg : userInfo.uploadUrl}
					alt="sample"
					className="w-full h-full rounded-full object-cover"
				/>
				<label
					htmlFor="profile"
					className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 rounded-full"
				>
					<div className="flex flex-col justify-center items-center text-[0.8rem] font-bold text-white">
						<MyEdit className="w-20 h-20 rounded-full" />
					</div>

					<input
						type="file"
						id="profile"
						className="hidden"
						onChange={onChangeImgHandler}
					/>
				</label>

				<button
					className={`text-center mt-4 px-3 py-2 rounded-md font-bold text-white ml-3 text-sm  ${
						!previewImg ? "bg-gray-300 cursor-not-allowed" : "bg-main-color"
					}`}
					disabled={!previewImg}
					onClick={() => onClickEditProfile()}
				>
					이미지변경
				</button>
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
								className={`w-[7rem] mt-4 px-3 py-2 font-bold text-white text-sm mr-2 rounded-md ${
									isNickNameDuplicate
										? "bg-main-color"
										: "bg-gray-300 cursor-not-allowed"
								}`}
								onClick={() => onClickNicknameChangeHandler()}
								disabled={!isNickNameDuplicate}
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

export default UserMyPageInfo;
