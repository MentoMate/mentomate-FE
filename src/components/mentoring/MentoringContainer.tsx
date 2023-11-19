import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Pagination from "../common/pagination/Pagination";
import SortAndSearch from "../common/search/SortAndSearch";
import MentoringTitle from "./MentoringTitle";
import MentoringList from "./mentoringList/MentoringList";
import NonExistMentoringList from "./mentoringList/NonExistMentoringList";

const MentoringContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("mentoring");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getMentoringList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url,
			method: "GET",
		});

		if (response && response.status === 200) {
			return response.data;
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
			setPagination(1);
		};
	}, []);

	return (
		<>
			<div className="h-min-height bg-black-100">
				<div className="flex flex-col items-center mx-auto">
					<SortAndSearch />
					<div className="md:mt-8 lg:w-[60rem] sm:w-[30rem] w-[15rem]">
						<MentoringTitle />
						{data.items.length === 0 ? (
							<NonExistMentoringList />
						) : (
							<>
								<MentoringList data={data.items} />
								<Pagination totalPages={data.totalPages} />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MentoringContainer;
