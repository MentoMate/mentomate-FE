import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import SortAndSearch from "@components/common/search/SortAndSearch";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Pagination from "../common/pagination/Pagination";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentorList/MentorList";
import NonExistMentorList from "./mentorList/NonExistMentorList";
import { alertHandler } from "@/utils/alert";

const MentorContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("mentor");
	const setSelectedCategory = useSetRecoilState(searchCriteria);
	const setPagination = useSetRecoilState(pagination);

	const getMentorList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url,
		});
		if (response) {
			const status = response.status;
			if (status === 200) {
				return response.data;
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 조회해주세요.",
				);
				return {
					items: [],
					totalPages: 1,
				};
			}
		}
	};

	const { data } = useQuery(["mentorList", url], getMentorList);

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
		<div className="h-min-height bg-black-100">
			<MentorRegister />
			<SortAndSearch />
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				{data.items.length !== 0 ? (
					<>
						<MentorList mentorList={data.items} />
						<Pagination totalPages={data.totalPages} />
					</>
				) : (
					<NonExistMentorList />
				)}
			</div>
		</div>
	);
};

export default MentorContainer;
