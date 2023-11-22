import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import MypageMentoringList from "@/components/userMyPage/userMyPageReview/UserMyPageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNoneReviewMentoring from "@/components/userMyPage/userMyPageReview/UserMyPageNoneReviewMentoring";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageReview = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(`/mentoring/end?page=0&size=3`);

	const getMyReviewMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};
	const { data, refetch } = useQuery(
		["mypageMentoringList", url],
		getMyReviewMentoringData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/mentoring/end?page=${currentPage - 1}&size=3`);
	};

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		refetch();
	}, ["/mentoring/history", refetch]);

	return (
		<>
			{data.content.length !== 0 ? (
				<>
					<div>종료된 멘토링에 평점 & 후기를 남겨주세요</div>
					<MypageMentoringList data={data.content} />
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNoneReviewMentoring />
			)}
		</>
	);
};
export default UserMyPageReview;
