import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNoneAlarm from "./UserMyPageNoneAlarm";
import Pagination from "@/components/common/pagination/Pagination";

interface IProps {
	readonly content: string;
	readonly isRead: boolean;
	readonly notificationId: number;
	readonly notificationType: string;
	readonly registerDate: string;
}
const UserMyPageAlarm = () => {
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

	const { data, refetch } = useQuery(
		["myNotificationList", url],
		getMyNotificationData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/notification?page=${currentPage - 1}&size=8`);
	};

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	useEffect(() => {
		refetch();
	}, [url]);
	return (
		<>
			{data.content.length !== 0 ? (
				<>
					{data.content.map((notificationItem: IProps) => (
						<div
							key={notificationItem.notificationId}
							className="py-6 border-b-2"
						>
							{notificationItem.content}
						</div>
					))}
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNoneAlarm />
			)}
		</>
	);
};
export default UserMyPageAlarm;
