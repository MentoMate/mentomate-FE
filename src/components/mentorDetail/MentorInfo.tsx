import { categories } from "@/constants/categories";
import useAxios from "@/hooks/useAxios";
import { IMentorItemProps } from "@/interface/mentorItem";
import { alertHandler } from "@/utils/alert";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Follow } from "@assets/svg/fillFollow.svg";
import { ReactComponent as NotFollow } from "@assets/svg/emptyFollow.svg";
import { loginState } from "@/state/loginState";
import { useRecoilState, useRecoilValue } from "recoil";
import Swal from "sweetalert2";
import { followState } from "@/state/followStats";

interface ICareer {
	readonly careerYear: number;
	readonly careerMonth: number;
}

const MentorInfo = ({ mentorItem }: IMentorItemProps) => {
	const [categoryName, setCategoryName] = useState<string>("");
	const [isFollow, setIsFollow] = useRecoilState(followState);
	const [career, setCareer] = useState<ICareer>({
		careerYear: 0,
		careerMonth: 0,
	});
	const { mentorId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const isLogin = useRecoilValue(loginState);
	const navigate = useNavigate();

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
						`/mentorDetail/${mentorId}`,
					);
					navigate("/login");
				}
			});
		} else {
			const response = await fetchDataUseAxios("useTokenAxios", {
				method: "POST",
				url: `/user/${mentorId}`,
			});

			if (response) {
				const status = response.status;

				if (status === 200) {
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

	const init = () => {
		const careerYear = Math.floor(mentorItem.career / 12);
		const careerMonth = mentorItem.career % 12;

		setCareer({
			careerYear,
			careerMonth,
		});

		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === mentorItem.middleCategory) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}

		setIsFollow(mentorItem.mentorFollow);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center sticky top-[8rem] md:mx-0 mx-auto md:ml-8 md:w-full w-[18rem] h-[15rem] border border-black-200 rounded-md shadow-md">
			<div className="flex items-center">
				<div className="lg:w-[7rem] md:w-[5rem] lg:h-[7rem] md:h-[5rem] w-[8rem] h-[8rem] rounded-full">
					<img
						src={mentorItem.uploadUrl}
						alt="sample"
						className="w-full h-full rounded-full object-cover"
					/>
				</div>
				<div className="flex flex-col justify-center ml-6">
					<div className="text-[0.8rem] text-main-color">{categoryName}</div>
					<div className="mt-0.5 lg:text-lg md:text-base text-lg font-semibold">
						{mentorItem.name}
						<span className="ml-1 text-[0.8rem] font-medium">멘토</span>
					</div>
					<div className="mt-2 text-[0.8rem] text-black-400">
						<p>
							경력 : <span>{career.careerYear}년 </span>
							<span>{career.careerMonth}개월</span>
						</p>
					</div>
					<div className="mt-0.5 text-[0.8rem] text-black-400">
						팔로워 : {mentorItem.followers} 명
					</div>
				</div>
			</div>
			<button
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

export default MentorInfo;
