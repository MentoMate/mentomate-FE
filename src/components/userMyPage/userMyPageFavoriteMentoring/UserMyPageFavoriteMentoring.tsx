import useAxios from "@/hooks/useAxios";
import MyPageMentoringList from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import MyPageNoneFavoriteMentoring from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageNoneFavoriteMentoring";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageFavoriteMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const [url, setUrl] = useState<string>(`/mentoring/follow?page=1&pageSize=2`);

	const getFavoriteMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(
		["myPageFavoriteMentoringList", url],
		getFavoriteMentoringData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/mentoring/follow?page=${currentPage}&pageSize=2`);
	};

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		refetch();
	}, [url]);
	return (
		<div className="mb-12">
			{data.content.length !== 0 ? (
				<>
					<MyPageMentoringList data={data.content} />
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNoneFavoriteMentoring />
			)}
		</div>
	);
};
export default UserMyPageFavoriteMentoring;
