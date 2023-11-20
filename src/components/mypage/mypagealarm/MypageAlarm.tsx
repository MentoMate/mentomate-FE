import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNoneAlarm from "./MyPageNoneAlarm";

interface Iprops {
	readonly content: string;
	readonly isRead: boolean;
	readonly notificationId: number;
	readonly notificationType: string;
	readonly registerDate: string;
}
const MypageAlarm = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(`/notification?page=0&size=8`);

	const getMyNotificationData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["myNotificationList", url], getMyNotificationData);
	console.log(data);
	useEffect(() => {
		getMyNotificationData();
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
		setUrl(`/notification?page=${currentPage - 1}&size=8`);
	};

	return (
		<>
			{data.content.length !== 0 ? (
				<>
					{data.content.map((notificationItem: Iprops) => (
						<div
							key={notificationItem.notificationId}
							className="h-[3rem] mb-12 border-b-2"
							dangerouslySetInnerHTML={{ __html: notificationItem.content }}
						/>
					))}
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
				<MyPageNoneAlarm />
			)}
		</>
	);
};
export default MypageAlarm;
