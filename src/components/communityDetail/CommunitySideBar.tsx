import { ReactComponent as EmptyHeart } from "@assets/svg/emptyHeart.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
import { ReactComponent as Share } from "@assets/svg/share.svg";
import { RefObject } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { ICommunityList } from "@/interface/community";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { loginState } from "@/state/loginState";

interface IProps {
	readonly commentRef: RefObject<HTMLDivElement>;
	readonly communityInfo: ICommunityList;
}

const CommunitySideBar = ({ commentRef, communityInfo }: IProps) => {
	const { communityId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

	const submitLikeHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/posts/${communityId}/postLikes`,
		});

		if (response && response.status !== 200) {
			alertHandler("error", "잠시 후에 다시 시도해주세요.");
		}
	};

	const onClickLikeHandler = async () => {
		!isLogin
			? Swal.fire({
					icon: "question",
					text: "로그인 이후 이용 가능합니다. 로그인 하시겠습니까?",
					showCancelButton: true,
					confirmButtonText: "확인",
					cancelButtonText: "취소",
			  }).then((result) => {
					if (result.isConfirmed) {
						navigate("/login");
					}
			  })
			: submitLikeHandler();
	};

	const onClickMoveHandler = () => {
		if (commentRef.current !== null) {
			commentRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	};

	return (
		<div className="hidden sm:flex flex-col items-center sticky top-24 lg:ml-12 md:ml-10 sm:ml-8 lg:py-6 md:py-3 lg:w-[9rem] md:w-[7rem] w-[5rem] lg:h-[24rem] md:h-[17rem] sm:h-[15rem] bg-white rounded-lg">
			<button
				type="button"
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] bg-white hover:bg-black-200 border rounded-full"
				onClick={onClickLikeHandler}
			>
				{communityInfo.like ? (
					<FillHeart width={30} height={30} />
				) : (
					<EmptyHeart width={30} height={30} />
				)}
			</button>
			<button
				type="button"
				onClick={onClickMoveHandler}
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] bg-white hover:bg-black-200 border rounded-full"
			>
				<Comment width={30} height={30} fill="#8A8A8A" />
			</button>
			<button
				type="button"
				className="flex justify-center items-center my-2 lg:w-[5rem] md:w-[4rem] sm:w-[3rem] lg:h-[5rem] md:h-[4rem] sm:h-[3rem] bg-white hover:bg-black-200 border rounded-full"
			>
				<Share width={25} height={25} fill="#8A8A8A" />
			</button>
		</div>
	);
};

export default CommunitySideBar;
