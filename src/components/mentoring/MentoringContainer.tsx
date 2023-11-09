import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const MentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { data } = useQuery("mentoringList", async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url: `/mentoring/search?sortBy=latest&page=1&Size=12`,
			method: "GET",
		});
		if (response) return response.data;
	});

	return (
		<div>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<SortAndSearch />
				<MentoringTitle />
				{data.length === 0 ? (
					<NonExistMentoringList />
				) : (
					<MentoringList data={data} />
				)}
			</div>
		</div>
	);
};

export default MentoringContainer;
