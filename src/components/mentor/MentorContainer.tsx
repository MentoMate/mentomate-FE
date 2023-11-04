import SortAndSearch from "@components/common/search/SortAndSearch";
import MentorRegister from "./MentorRegister";
import MentorList from "./mentoringList/MentorList";
import NonExistMentoringList from "../mentoring/mentoringList/NonExistMentoringList";
import { useQuery } from "react-query";
import useAxios from "@/hooks/useAxios";
import { Suspense, useState } from "react";
import Loading from "../common/spinner/Loading";

const MentorContainer = () => {
	const [page, setPage] = useState<number>(1);
	const { fetchDataUseAxios } = useAxios();
	const getMentorList = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: "/user/profile",
		});
		if (response && response.status === 200) {
			return response.data.content;
		}
	};
	const { data } = useQuery(["mentorList", page], getMentorList, {
		cacheTime: 5 * 60 * 1000,
	});

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
