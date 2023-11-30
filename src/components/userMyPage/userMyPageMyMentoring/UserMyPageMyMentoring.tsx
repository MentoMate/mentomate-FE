import useAxios from "@/hooks/useAxios";
import UserMyPageMentoringList from "@/components/userMyPage/userMyPageMyMentoring/UserMyPageMentoringList";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import UserMyPageNoneMentoring from "@/components/userMyPage/userMyPageMyMentoring/UserMyPageNoneMentoring";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageMyMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const userId = localStorage.getItem("userId");
	const [url, setUrl] = useState<string>(
		`/mentoring/${userId}/history?page=1&pageSize=3`,
	);

	const getMyMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(
		["myPageMentoringList", url],
		getMyMentoringData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/mentoring/${userId}/history?page=${currentPage}&pageSize=3`);
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
					<UserMyPageMentoringList data={data.content} />
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<UserMyPageNoneMentoring />
			)}
		</div>
	);
};

export default UserMyPageMyMentoring;
