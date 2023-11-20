import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { IMyPaymentItem } from "@/interface/myPagePayment";
import UserMyPagePaymentCard from "@/components/userMyPage/userMyPagePayment/UserMyPagePaymentCard";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MyPageNonePayment from "./UserMyPageNonePayment";

const UserMyPagePayment = () => {
	const { fetchDataUseAxios } = useAxios();

	const [url, setUrl] = useState<string>(`/pay/list?page=0&size=3`);

	const getMyPayData = async () => {
		console.log(url);
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	};

	const { data } = useQuery(["myPayList", url], getMyPayData);
	console.log(data.totalPages);

	useEffect(() => {
		getMyPayData();
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
		setUrl(`/pay/list?page=${currentPage - 1}&size=3`);
	};
	// key 수정
	return (
		<>
			{data.content.length !== 0 ? (
				<>
					{data.content.map((payItem: IMyPaymentItem, index: any) => (
						<UserMyPagePaymentCard key={index} payItem={payItem} />
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
				<MyPageNonePayment />
			)}
		</>
	);
};
export default UserMyPagePayment;
