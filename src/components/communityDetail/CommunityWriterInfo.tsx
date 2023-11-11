import useAxios from "@/hooks/useAxios";
import { ICommunityProps } from "@/interface/community";
import { alertHandler } from "@/utils/alert";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const CommunityWriterInfo = ({ communityInfo }: ICommunityProps) => {
	const { communityId } = useParams();
	const navigate = useNavigate();
	const { fetchDataUseAxios } = useAxios();

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

	return (
		<div className="flex justify-between mt-16 border-b border-black-200 py-2 mb-12">
			<div className="flex">
				<div className="w-[4rem] h-[4rem] border border-black-200 rounded-full">
					<img
						src="/src/assets/svg/user.svg"
						alt=""
						className="w-full h-full rounded-full object-contain"
					/>
				</div>
				<div className="flex flex-col justify-center ml-4">
					<div className="md:text-base text-sm font-bold">
						{communityInfo.nickName}
					</div>
					<div className="flex md:flex-row flex-col md:mt-0 mt-1 text-black-400">
						<div className="md:text-base text-sm">
							작성일 : {String(communityInfo.registerDatetime)}
						</div>
						<div className="md:ml-3 md:text-base text-sm">
							조회 {communityInfo.countWatch}
						</div>
					</div>
				</div>
			</div>
			<div className="text-sm text-black-300">
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
