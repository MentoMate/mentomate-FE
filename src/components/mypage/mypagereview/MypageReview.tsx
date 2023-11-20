import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import MypageMentoringList from "@components/mypage/myPageReview/MypageMentoringList";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNoneReviewMentoring from "@components/mypage/myPageReview/MyPageNoneReviewMentoring";

const MypageReview = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(`/mentoring/end?page=0&size=3`);

	const getMyReviewMentoringData = async () => {
		console.log(url);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};
	const { data } = useQuery(
		["mypageMentoringList", url],
		getMyReviewMentoringData,
	);
	console.log(data.totalPages);

	useEffect(() => {
		getMyReviewMentoringData();
	}, []);
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
		setUrl(`/mentoring/end?page=${currentPage - 1}&size=3`);
	};

	return (
		<>
			{data.content.length !== 0 ? (
				<>
					<div>종료된 멘토링에 평점 & 후기를 남겨주세요</div>
					<MypageMentoringList data={data.content} />
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
				<MyPageNoneReviewMentoring />
			)}
		</>
	);
};
export default MypageReview;
