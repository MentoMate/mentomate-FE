import useAxios from "@/hooks/useAxios";
import MyPageMentoringList from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import MyPageNoneFavoriteMentoring from "@/components/userMyPage/userMyPageFavoriteMentoring/UserMyPageNoneFavoriteMentoring";

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

	const { data } = useQuery(
		["myPageFavoriteMentoringList", url],
		getFavoriteMentoringData,
	);

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
		setUrl(`/mentoring/follow?page=${currentPage}&pageSize=2`);
	};

	useEffect(() => {
		getFavoriteMentoringData();
	}, []);

	return (
		<div className="mb-12">
			{data.content.length !== 0 ? (
				<>
					<MyPageMentoringList data={data.content} />
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
				<MyPageNoneFavoriteMentoring />
			)}
		</div>
	);
};
export default UserMyPageFavoriteMentoring;
