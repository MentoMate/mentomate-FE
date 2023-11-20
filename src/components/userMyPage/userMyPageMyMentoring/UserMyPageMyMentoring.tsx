import useAxios from "@/hooks/useAxios";
import UserMyPageMentoringList from "@/components/userMyPage/userMyPageMyMentoring/UserMyPageMentoringList";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import UserMyPageNoneMentoring from "@/components/userMyPage/userMyPageMyMentoring/UserMyPageNoneMentoring";

const UserMyPageMyMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const userId = localStorage.getItem("userId");
	const [url, setUrl] = useState<string>(
		`/mentoring/${userId}/history?page=1&pageSize=6`,
	);

	const getMyMentoringData = async () => {
		console.log(url);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["myPageMentoringList", url], getMyMentoringData);

	const {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	} = usePagination(data.totalPages);

	useEffect(() => {
		getMyMentoringData();
	}, [data]);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);
	const transformationUrl = () => {
		setUrl(`/mentoring/${userId}/history?page=${currentPage}&pageSize=6`);
	};

	return (
		<div className="mb-12">
			{data.content.length !== 0 ? (
				<>
					<UserMyPageMentoringList data={data.content} />
					<div className="my-12 h-30  flex justify-center items-center">
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
				<UserMyPageNoneMentoring />
			)}
		</div>
	);
};

export default UserMyPageMyMentoring;
