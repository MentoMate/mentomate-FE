import { useEffect, useState } from "react";
import CommunityList from "@/components/userMyPage/userMyPageWriting/CommunityList";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import MyPageNoneCommunity from "@/components/userMyPage/userMyPageWriting/UserMyPageNoneCommunity";

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

	useEffect(() => {
		getMyWritingData();
	}, [data]);
	const {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	} = usePagination(data.totalPages);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);
	const transformationUrl = () => {
		setUrl(`/posts/myPage?page=${currentPage}&pageSize=4`);
	};

	useEffect(() => {
		refetch(); // Manually refetch data when URL changes
	}, ["/mentoring/history", refetch]);

	useEffect(() => {
		refetch(); // Initial fetch
	}, []);

	return (
		<>
			{data.items.length !== 0 ? (
				<>
					<CommunityList data={data.items} />
					<div className="my-12 h-20 flex justify-center items-center">
						<button
							type="button"
							onClick={() => onClickNextOrPrevBtnHandler("prev")}
							disabled={currentPage === 1 ? true : false}
							className="mr-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white"
						>
							이전
						</button>
						{pageArray.map((page: number) => (
							<div
								key={page}
								className={`mx-1 text-lg ${
									currentPage === page
										? "text-main-color font-semibold"
										: "text-black"
								} cursor-pointer`}
								onClick={() => onClickPageHandler(page)}
							>
								{page}
							</div>
						))}
						<button
							type="button"
							onClick={() => onClickNextOrPrevBtnHandler("next")}
							disabled={currentPage === data.totalPages ? true : false}
							className="ml-3 px-2 py-1.5 bg-black-500 hover:bg-black-400 disabled:bg-black-300 rounded-md text-white "
						>
							다음
						</button>
					</div>
				</>
			) : (
				<MyPageNoneCommunity />
			)}
		</>
	);
};
export default UserMyPageWriting;
