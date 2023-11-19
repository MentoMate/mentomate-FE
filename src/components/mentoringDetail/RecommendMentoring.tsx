import useAxios from "@/hooks/useAxios";
import RecommendMentoringItem from "./RecommendMentoringItem";
import { useQuery } from "react-query";

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
			if (response.status === 200) {
				const result: IRecommendMentoring[] = new Array();

				for (let i = 0; i < 3; i++) {
					result.push(response.data.MentoringByCountWatch[i]);
				}

				return result;
			}
		}
	};

	const { data } = useQuery("recommendMentoring", getRecommendMentoring);

	return (
		<div className="mt-20 sm:mx-0 mx-4">
			<h2 className="mb-6 text-lg font-bold">이런 멘토링은 어때요?</h2>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 place-items-center">
				{data &&
					data.map((recommendMentoring: IRecommendMentoring, index: number) => (
						<div
							key={recommendMentoring.mentoringId}
							className={`${index === 0 ? "md:mr-2" : "mx-2"}`}
						>
							<RecommendMentoringItem recommendMentoring={recommendMentoring} />
						</div>
					))}
			</div>
		</div>
	);
};

export default RecommendMentoring;
