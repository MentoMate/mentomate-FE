import useAxios from "@/hooks/useAxios";
import MyPageApplyMentoringList from "@/components/userMyPage/userMyPageApplyMentoring/UserMyPageApplyMentoringList";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import MyPageNoneApplyMentoring from "@/components/userMyPage/userMyPageApplyMentoring/UserMyPageNoneApplyMentoring";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageApplyMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const [url, setUrl] = useState<string>(
		`/mentoring/history?page=1&pageSize=3`,
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
		["myPageApplyMentoringList", url],
		getMyMentoringData,
	);

	const transformationUrl = () => {
		setUrl(`/mentoring/history?page=${currentPage}&pageSize=3`);
	};

	const { currentPage } = usePagination(data.totalPages);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		getMyMentoringData();
	}, [url]);
	useEffect(() => {
		refetch();
	}, [url, refetch]);

	useEffect(() => {
		refetch();
	}, []);
	return (
		<div className="mb-12">
			{data.content.length !== 0 ? (
				<>
					<MyPageApplyMentoringList data={data.content} />
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNoneApplyMentoring />
			)}
		</div>
	);
};
export default UserMyPageApplyMentoring;
