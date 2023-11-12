import SortAndSearch from "@components/common/search/SortAndSearch";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentoringList/MentorList";
import NonExistMentoringList from "../mentoring/mentoringList/NonExistMentoringList";
import { useQuery } from "react-query";
import useAxios from "@/hooks/useAxios";
import { Suspense, useState, useEffect } from "react";
import Loading from "../common/spinner/Loading";
import useUrl from "@/hooks/useUrl";
import { useSetRecoilState } from "recoil";
import { searchCriteria } from "@/state/searchCriteria";

const MentorContainer = () => {
	const [page, setPage] = useState<number>(1);
	const { fetchDataUseAxios } = useAxios();
	const { url } = useUrl("mentor");
	const setSelectedCategory = useSetRecoilState(searchCriteria);

	const getMentorList = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url,
		});
		if (response && response.status === 200) {
			return response.data.items;
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
		};
	}, []);

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<MentorRegister />
				<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
					<SortAndSearch />
					{data.length !== 0 ? (
						<MentorList mentorList={data} />
					) : (
						<NonExistMentoringList />
					)}
				</div>
			</div>
		</Suspense>
	);
};

export default MentorContainer;
