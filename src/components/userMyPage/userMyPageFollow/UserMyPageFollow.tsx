import useAxios from "@/hooks/useAxios";
import usePagination from "@/hooks/usePagination";
import { IMyMentorItem } from "@/interface/myPageMentor";
import MentorItem from "@/components/userMyPage/userMyPageFollow/UserMentorItem";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import UserMyPageNoneFollow from "./UserMyPageNoneFollow";
import Pagination from "@/components/common/pagination/Pagination";

const UserMyPageFollow = () => {
	const { fetchDataUseAxios } = useAxios();
	const [url, setUrl] = useState<string>(`/user/profile/follow`);

	const getMentorFollowData = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: url,
		});
		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data, refetch } = useQuery(
		["myPageMentorFollowList", url],
		getMentorFollowData,
	);

	const { currentPage } = usePagination(data.totalPages);

	const transformationUrl = () => {
		setUrl(`/user/profile/follow?page=${currentPage}&pageSize=6`);
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
					<Pagination totalPages={data.totalPages} />
				</>
			) : (
				<UserMyPageNoneFollow />
			)}
		</>
	);
};

export default UserMyPageFollow;
