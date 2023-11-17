import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { IMyMentorItem } from "@/interface/myPageMentor";
import MentorItem from "@components/mypage/myPageFollow/MentorItem";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const MypageFollow = () => {
	const { fetchDataUseAxios } = useAxios();
	const [url, setUrl] = useState<string>(
		`/user/profile/follow?page=1&pageSize=3`,
	);
	const getMentorFollowData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};
	const { data } = useQuery(
		["mypageMentorFollowList", url],
		getMentorFollowData,
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
		setUrl(`/user/profile/follow?page=${currentPage}&pageSize=5`);
	};
	useEffect(() => {
		getMentorFollowData();
	}, []);
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 place-items-center mb-32">
				{data.content.map((mentorItem: IMyMentorItem) => (
					<Link
						key={mentorItem.userId}
						to={`/mentorDetail/${mentorItem.userId}`}
					>
						<MentorItem mentorItem={mentorItem} />
					</Link>
				))}
			</div>
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
	);
};

export default MypageFollow;
