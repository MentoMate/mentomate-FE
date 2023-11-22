import { useEffect, useState } from "react";
import CommunityList from "@/components/userMyPage/userMyPageWriting/CommunityList";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import MyPageNoneCommunity from "@/components/userMyPage/userMyPageWriting/UserMyPageNoneCommunity";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageWriting = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>("/posts/myPage?page=1&pageSize=4");

	const getMyWritingData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(
		["myPageWritingList", url],
		getMyWritingData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/posts/myPage?page=${currentPage}&pageSize=4`);
	};

	useEffect(() => {
		getMyWritingData();
	}, [data]);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		refetch();
	}, ["/mentoring/history"]);

	return (
		<>
			{data.items.length !== 0 ? (
				<>
					<CommunityList data={data.items} />
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNoneCommunity />
			)}
		</>
	);
};
export default UserMyPageWriting;
