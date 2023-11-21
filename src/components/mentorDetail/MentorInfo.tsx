import { categories } from "@/constants/categories";
import useAxios from "@/hooks/useAxios";
import { IMentorItemProps } from "@/interface/mentorItem";
import { alertHandler } from "@/utils/alert";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ICareer {
	readonly careerYear: number;
	readonly careerMonth: number;
}

const MentorInfo = ({ mentorItem }: IMentorItemProps) => {
	const [categoryName, setCategoryName] = useState<string>("");
	const [career, setCareer] = useState<ICareer>({
		careerYear: 0,
		careerMonth: 0,
	});
	const params = useParams();
	const { fetchDataUseAxios } = useAxios();

	const onClickFavoriteMentorHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "POST",
			url: `/user/${params.mentorId}`,
		});
		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 401 || status === 403) {
				alertHandler("error", "로그인 이후 팔로우 가능합니다.");
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
			}
		}
	};

	const calculateCareer = () => {
		const careerYear = Math.floor(mentorItem.career / 12);
		const careerMonth = mentorItem.career % 12;

		setCareer({
			careerYear,
			careerMonth,
		});
	};

	const getCategoryNameHandler = () => {
		for (let key in categories) {
			categories[key].find((category) => {
				if (category.key === mentorItem.middleCategory) {
					setCategoryName(category.categoryName);
					return;
				}
			});
		}
	};

	useEffect(() => {
		calculateCareer();
		getCategoryNameHandler();
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
				onClick={() => onClickFavoriteMentorHandler()}
				className="mt-6 bg-main-color lg:px-20 md:px-14 px-20 py-3 text-white text-sm font-bold rounded-[0.3rem] hover:bg-purple-100 transition duration-200"
			>
				팔로우
			</button>
		</div>
	);
};

export default MentorInfo;
