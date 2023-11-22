import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import RecommendMentoringItem from "./RecommendMentoringItem";

interface IRecommendMentoring {
	readonly mentoringId: number;
	readonly title: string;
	readonly content: string;
	readonly startDate: string;
	readonly endDate: string;
	readonly numberOfPeople: number;
	readonly amount: number;
	readonly status: string;
	readonly category: string;
	readonly uploadUrl: string;
	readonly uploadFolder: string;
	readonly countWatch: number;
	readonly rating: number;
	readonly name: string;
	readonly registerDate: string;
	readonly updateDate: string;
	readonly deleteDate: string | null;
}

const RecommendMentoring = () => {
	const { fetchDataUseAxios } = useAxios();

	const getRecommendMentoring = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url: "/mentoring/main",
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				const result: IRecommendMentoring[] = new Array();
				const recommendMentoringList = response.data.MentoringByCountWatch;

				if (recommendMentoringList.length >= 3) {
					for (let i = 0; i < 3; i++) {
						result.push(recommendMentoringList[i]);
					}
				}

				if (recommendMentoringList.length >= 1 && recommendMentoringList < 3) {
					for (let i = 0; i < recommendMentoringList.length; i++) {
						result.push(recommendMentoringList[i]);
					}
				}

				if (recommendMentoringList.length === 0) {
					return [];
				}

				return result;
			}

			if (status === 500) {
				return [];
			}
		}
	};

	const { data } = useQuery("recommendMentoring", getRecommendMentoring);

	return (
		<div className="mt-20 sm:mx-0 mx-4">
			<h2 className="mb-6 text-lg font-bold">이런 멘토링은 어때요?</h2>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center">
				{data && data.length > 0 ? (
					data.map((recommendMentoring: IRecommendMentoring, index: number) => (
						<div
							key={recommendMentoring.mentoringId}
							className={`${index === 0 ? "md:mr-2" : "mx-2"}`}
						>
							<RecommendMentoringItem recommendMentoring={recommendMentoring} />
						</div>
					))
				) : (
					<div className="flex justify-center items-center lg:w-[40rem] md:w-[25rem] sm:w-[20rem] h-[10rem] mx-auto text-center text-black-400">
						<p>현재 등록된 멘토링이 없습니다.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecommendMentoring;
