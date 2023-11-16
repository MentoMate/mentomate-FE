import useAxios from "@/hooks/useAxios";
import useUrl from "@/hooks/useUrl";
import { pagination } from "@/state/pagination";
import { searchCriteria } from "@/state/searchCriteria";
import SortAndSearch from "@components/common/search/SortAndSearch";
import Loading from "@components/common/spinner/Loading";
import { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import Pagination from "../common/pagination/Pagination";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentorList/MentorList";
import NonExistMentorList from "./mentorList/NonExistMentorList";

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
		if (response && response.status === 200) {
			return response.data;
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
		<Suspense fallback={<Loading />}>
			<div className="h-min-height">
				<MentorRegister />
				<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
					<SortAndSearch />
					{data.length !== 0 ? (
						<>
							<MentorList mentorList={data.items} />
							<Pagination totalPages={data.totalPages} />
						</>
					) : (
						<NonExistMentorList />
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default MentorContainer;
