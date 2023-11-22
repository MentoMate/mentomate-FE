import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { IMyPaymentItem } from "@/interface/myPagePayment";
import UserMyPagePaymentCard from "@/components/userMyPage/userMyPagePayment/UserMyPagePaymentCard";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNonePayment from "./UserMyPageNonePayment";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPagePayment = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(`/pay/list?page=0&size=3`);

	const getMyPayData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(["myPayList", url], getMyPayData);

	const { currentPage } = usePagination(data.totalPages);

	useEffect(() => {
		transformationUrl();
	}, [currentPage]);

	const transformationUrl = () => {
		setUrl(`/pay/list?page=${currentPage - 1}&size=3`);
	};

	useEffect(() => {
		refetch();
	}, [url]);

	return (
		<>
			{data.content.length !== 0 ? (
				<>
					{data.content.map((payItem: IMyPaymentItem, index: any) => (
						<UserMyPagePaymentCard key={index} payItem={payItem} />
					))}

					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<MyPageNonePayment />
			)}
		</>
	);
};
export default UserMyPagePayment;
