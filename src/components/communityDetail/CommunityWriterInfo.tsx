import useAxios from "@/hooks/useAxios";
import { ICommunityProps } from "@/interface/community";
import { alertHandler } from "@/utils/alert";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const IMAGE_SRC = "/src/assets/svg/user.svg";

const CommunityWriterInfo = ({ communityInfo }: ICommunityProps) => {
	const { communityId } = useParams();
	const navigate = useNavigate();
	const { fetchDataUseAxios } = useAxios();
	const [registerDate, setRegisterDate] = useState<string>("");

	const deletePostHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "DELETE",
			url: `/posts/${communityId}`,
		});

		if (response && response.status === 200) {
			alertHandler("success", "게시글이 삭제되었습니다.");
			navigate("/community");
		} else {
			alertHandler("error", "잠시 후에 다시 시도해주세요.");
		}
	};

	const onClickDeleteBtnHandler = () => {
		Swal.fire({
			icon: "question",
			text: "게시글 삭제를 하시겠습니까?",
			showCancelButton: true,
			confirmButtonText: "확인",
			cancelButtonText: "취소",
		}).then((result) => {
			if (result.isConfirmed) {
				deletePostHandler();
			}
		});
	};

	useEffect(() => {
		const date = new Date(communityInfo.registerDatetime);
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		const dateStr = `${year}년 ${month}월 ${day}일`;
		setRegisterDate(dateStr);
	}, []);

	return (
		<div className="flex justify-between mt-16 border-b border-black-200 pt-2 pb-3 mb-12">
			<div className="flex">
				<div className="w-[4rem] h-[4rem] border border-black-200 rounded-full">
					<img
						src={
							communityInfo.userUploadUrl === null
								? IMAGE_SRC
								: communityInfo.userUploadUrl
						}
						alt="userProfile"
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center ml-4">
					<div className="mb-1 text-sm font-bold">{communityInfo.nickName}</div>
					<div className="flex md:flex-row flex-col md:mt-0 mt-1 text-black-400">
						<div className="text-[0.8rem]">
							작성일 : <span className="font-semibold ">{registerDate}</span>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`${
					communityInfo.owner ? "block" : "hidden"
				} text-sm text-black-300`}
			>
				<Link to={`/communityEdit/${communityId}`} className="mx-1">
					수정
				</Link>
				<button className="mx-1" onClick={onClickDeleteBtnHandler}>
					삭제
				</button>
			</div>
		</div>
	);
};

export default CommunityWriterInfo;
