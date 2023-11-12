import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { useQuery } from "react-query";
import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const MentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { finalUrl } = useUrl(
		"/mentoring/search?sortBy=latest&page=1&pageSize=12",
	);

	const { isLoading, data } = useQuery("mentoringList", async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url: finalUrl,
			method: "GET",
		});

		if (response && response.status === 200) {
			return response.data.items;
		}
	});

	return (
		<>
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
			{/* {isLoading && <Spinner />} */}
		</>
	);
};

export default MentoringContainer;
