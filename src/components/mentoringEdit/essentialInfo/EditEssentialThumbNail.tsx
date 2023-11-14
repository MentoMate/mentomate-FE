import { mentoringEditForm } from "@/data/mentoringEditForm";
import { ReactComponent as Image } from "@assets/svg/image.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const EditEssentialThumbNail = () => {
	const [form, setForm] = useRecoilState(mentoringEditForm);
	const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

	const makePreviewImgHandler = (thumbNailImgFile: File) => {
		const reader = new FileReader();
		reader.readAsDataURL(thumbNailImgFile);

		reader.onload = (e) => {
			if (e.target !== null) {
				setPreviewImg(e.target.result as string);
			}
		};
	};

	const changeThumbNailImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.currentTarget.files) {
			if (!e.currentTarget.files[0]) return;

			const thumbNailImgFile = e.currentTarget.files[0];
			makePreviewImgHandler(thumbNailImgFile);

			if (thumbNailImgFile) {
				setForm({
					...form,
					thumbNailImg: thumbNailImgFile,
				});
			}
		}
	};

	useEffect(() => {
		if (form.thumbNailImgUrl !== "") {
			setPreviewImg(form.thumbNailImgUrl);
		}
	}, [form]);

	return (
		<div>
			<div className="flex lg:flex-row flex-col lg:items-end mb-2 font-bold lg:text-lg md:text-base sm:text-sm">
				<div className="flex">
					<Image width={25} height={25} className="mr-2" />
					썸네일
				</div>
				<p className="md:block flex flex-col ml-4 mb-0.5 font-semibold sm:text-sm text-[0.8rem]">
					썸네일 이미지를 등록해주세요.
					<span className="md:ml-2 ml-0 sm:text-sm text-[0.8rem] font-normal text-black-400">
						글 작성 시 등록되는 기본 이미지입니다.
					</span>
				</p>
			</div>
			<label htmlFor="thumbNail">
				<div className="flex justify-center items-center mb-4 w-full lg:h-[25rem] md:h-[15rem] sm:h-[12rem] bg-black-200 cursor-pointer">
					{previewImg ? (
						<img
							src={previewImg}
							alt="미리보기"
							className="w-full lg:h-[25rem] md:h-[15rem] sm:h-[12rem] object-fill"
						/>
					) : (
						<p className="p-4 bg-black-500 font-bold text-white rounded-md">
							썸네일 이미지 업로드 하기
						</p>
					)}
				</div>
				<input
					type="file"
					id="thumbNail"
					onChange={changeThumbNailImgHandler}
					className="hidden"
				/>
			</label>
		</div>
	);
};

export default EditEssentialThumbNail;
