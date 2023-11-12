import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { useQuery } from "react-query";
import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { searchCriteria } from "@/state/searchCriteria";

const MentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const { url } = useUrl("mentoring");

	const getMentoringList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url,
			method: "GET",
		});

		if (response && response.status === 200) {
			return response.data.items;
		}
	};

	const { data } = useQuery(["mentoringList", url], getMentoringList);

	useEffect(() => {
		return () => {
			setSelectedCategory({
				sortBy: "latest",
				keyword: "",
				category: "",
				searchType: "title",
			});
		};
	}, []);

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
		</>
	);
};

export default MentoringContainer;
