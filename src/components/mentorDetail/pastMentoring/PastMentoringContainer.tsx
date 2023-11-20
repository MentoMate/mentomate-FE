import useAxios from "@/hooks/useAxios";
import NonExistsPastMentoring from "./NonExistsPastMentoring";
import PastMentoringList from "./PastMentoringList";
import { useState, useEffect } from "react";
import { IPastMentoring } from "@/interface/MentoringDetail";

interface IProps {
	userId: number;
}

const PastMentoringContainer = ({ userId }: IProps) => {
	const { fetchDataUseAxios } = useAxios();
	const [pastMentoringList, setPastMentoringList] = useState<IPastMentoring[]>(
		[],
	);

	const getPastMentoring = async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			method: "GET",
			url: `/mentoring/${userId}/history?page=1&pageSize=3&sortId=id&sortDirection=DESC`,
		});

		if (response) {
			if (response.status === 200) {
				console.log("asd");
				setPastMentoringList(response.data.content);
			}
		}
	};

	useEffect(() => {
		getPastMentoring();
	}, []);

	return (
		<div className="md:mx-0 mx-4 mt-16">
			<h2 className="md:text-xl text-lg font-bold">멘토가 진행했던 멘토링</h2>
			{pastMentoringList.length === 0 ? (
				<NonExistsPastMentoring />
			) : (
				<PastMentoringList pastMentoringList={pastMentoringList} />
			)}
		</div>
	);
};

export default PastMentoringContainer;
