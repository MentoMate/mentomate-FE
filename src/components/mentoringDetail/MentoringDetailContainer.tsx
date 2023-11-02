import { Suspense } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../common/spinner/Spinner";
import RecommendMentoring from "./RecommendMentoring";
import MentoringContent from "./mentoringInfoWithApply/MentoringContent";
import MentoringInfoWithApply from "./mentoringInfoWithApply/MentoringInfoWithApply";
import useAxios from "@/hooks/useAxios";

const MentoringDetailContainer = () => {
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();
	const { mentoringId } = useParams();
	const { error, data } = useQuery("mentoringInfo", async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			url: `/mentoring/${mentoringId}`,
			method: "GET",
		});
		if (response) return response.data;
	});

	if (error) navigate("/mentoring");
	if (!data) {
		return <></>;
	}

	return (
		<Suspense fallback={<Spinner />}>
			<div className="flex md:flex-row flex-col mx-auto my-16 lg:w-[60rem] md:w-[40rem] w-[20rem]">
				<Link to={`/mentoringEdit/${mentoringId}`}>수정</Link>
				<div>
					<MentoringContent data={data} />
					<div className="md:hidden block mt-20">
						<MentoringInfoWithApply data={data} />
					</div>
					<RecommendMentoring />
				</div>
				<div className="md:block hidden">
					<MentoringInfoWithApply data={data} />
				</div>
			</div>
		</Suspense>
	);
};

export default MentoringDetailContainer;
