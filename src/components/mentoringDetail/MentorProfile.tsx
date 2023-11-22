import useAxios from "@/hooks/useAxios";
import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import { loginState } from "@/state/loginState";
import { alertHandler } from "@/utils/alert";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { ReactComponent as Follow } from "@assets/svg/fillFollow.svg";
import { ReactComponent as NotFollow } from "@assets/svg/emptyFollow.svg";
import { useQueryClient } from "react-query";

const MentorProfile = ({ data }: IMentoringDetailProps) => {
	const [replaceFollowerCount, setReplaceFollowerCount] = useState<string>("");
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();
	const { mentoringId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const [isFollow, setIsFollow] = useState<boolean>(data.mentorFollow);
	const queryClient = useQueryClient();

	const init = () => {
		const replaceFollower = data.followers.toLocaleString();
		setReplaceFollowerCount(replaceFollower);
	};

	const onClickFollowMentorHandler = async () => {
		if (!isLogin) {
			Swal.fire({
				icon: "question",
				text: "로그인 이후 이용 가능합니다. 로그인 하시겠습니까?",
				showCancelButton: true,
				confirmButtonText: "확인",
				cancelButtonText: "취소",
			}).then((result) => {
				if (result.isConfirmed) {
					sessionStorage.setItem(
						"previousLocation",
						`/mentoringDetail/${mentoringId}`,
					);
					navigate("/login");
				}
			});
		} else {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `/user/${data.userId}`,
			});

			if (response) {
				const status = response.status;

				if (status === 200) {
					let addFollower = "";
					if (!isFollow === true) {
						addFollower = (data.followers + 1).toLocaleString();
					} else {
						addFollower = (data.followers - 1).toLocaleString();
					}

					setReplaceFollowerCount(addFollower);
					queryClient.invalidateQueries("mentoringInfo");
					setIsFollow(!isFollow);
				}

				if (status === 400) {
					alertHandler("error", "본인은 팔로우 할 수 없습니다.");
					return;
				}

				if (status === 401 || status === 403) {
					alertHandler("error", "로그인 이후 팔로우 가능합니다.");
					return;
				}

				if (status === 500) {
					alertHandler(
						"error",
						"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
					);
					return;
				}
			}
		}
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center mt-4 py-3 bg-white border border-black-200 rounded-md">
			<div className="mx-3 w-[6rem] h-[6rem]">
				<Link to={`/mentorDetail/${data.userId}`}>
					<img
						src={data.useProfileImg}
						alt="sample"
						className="w-full h-full rounded-full border border-black-200"
					/>
				</Link>
			</div>
			<div className="lg:ml-3 md:ml-2 ml-3">
				<div className="mb-1 text-lg font-semibold">
					{data.name}
					<span className="ml-1 text-[0.8rem] font-normal">멘토</span>
				</div>
				<div className="lg:text-sm md:text-[0.7rem] text-sm">
					팔로워
					<span className="ml-2 font-semibold text-main-color">
						{replaceFollowerCount}명
					</span>
				</div>
			</div>
			<button
				type="button"
				onClick={() => onClickFollowMentorHandler()}
				className="flex items-center mt-6 bg-white lg:px-16 md:px-14 px-20 py-2 text-main-color text-sm font-bold border border-main-color rounded-[0.3rem] hover:bg-purple-100 transition duration-200"
			>
				{isFollow ? (
					<Follow width={30} height={30} className="mr-2" />
				) : (
					<NotFollow width={30} height={30} className="mr-2" />
				)}
				팔로우
			</button>
		</div>
	);
};

export default MentorProfile;
