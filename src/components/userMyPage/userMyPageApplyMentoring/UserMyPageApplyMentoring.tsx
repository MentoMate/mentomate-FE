import useAxios from "@/hooks/useAxios";
import MyPageApplyMentoringList from "@/components/userMyPage/userMyPageApplyMentoring/UserMyPageApplyMentoringList";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import MyPageNoneApplyMentoring from "@/components/userMyPage/userMyPageApplyMentoring/UserMyPageNoneApplyMentoring";

const UserMyPageApplyMentoring = () => {
	const { fetchDataUseAxios } = useAxios();
	const [url, setUrl] = useState<string>(`/mentoring/history`);

	const getMyMentoringData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(
		["myPageApplyMentoringList", url],
		getMyMentoringData,
	);

	const transformationUrl = () => {
		setUrl(`/mentoring/history`);
	};

	const {
		pageArray,
		currentPage,
		onClickPageHandler,
		onClickNextOrPrevBtnHandler,
	} = usePagination(data.totalPages);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		getMyMentoringData();
	}, []);

	return (
		<div className="mb-12">
			{data.content.length !== 0 ? (
				<>
					<MyPageApplyMentoringList data={data.content} />
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
				<MyPageNoneApplyMentoring />
			)}
		</div>
	);
};
export default UserMyPageApplyMentoring;
