import useAxios from "@/hooks/useAxios";
import MypageMentoringList from "@components/mypage/myPageMyMentoring/MypageMentoringList";
import { useQuery } from "react-query";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";

const MypageMyMentoring = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(
		`/mentoring/${2}/history?page=1&pageSize=6`,
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

	const { data } = useQuery(["mypageMentoringList", url], getMyMentoringData);
	console.log(data.totalPages);

	useEffect(() => {
		getMyMentoringData();
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
		setUrl(`/mentoring/${2}/history?page=${currentPage}&pageSize=6`);
	};

	return (
		<div className="mb-12">
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
		</div>
	);
};
export default MypageMyMentoring;
