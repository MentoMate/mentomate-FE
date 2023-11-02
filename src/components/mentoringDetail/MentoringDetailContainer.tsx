import { getCookie } from "@/utils/cookies";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import RecommendMentoring from "./RecommendMentoring";
import MentoringContent from "./mentoringInfoWithApply/MentoringContent";
import MentoringInfoWithApply from "./mentoringInfoWithApply/MentoringInfoWithApply";
import { Suspense } from "react";
import Spinner from "../common/spinner/Spinner";

const MentoringDetailContainer = () => {
	const { mentoringId } = useParams();
	const token = getCookie("accessToken");
	const { error, data } = useQuery(
		"mentoringInfo",
		async () =>
			await axios.get(`/api/mentoring/${mentoringId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
	);

	if (error) return <div>asdasd</div>;
	if (!data) {
		return <></>;
	}

	return (
		<Suspense fallback={<Spinner />}>
			<div className="flex md:flex-row flex-col mx-auto my-16 lg:w-[60rem] md:w-[40rem] w-[20rem]">
				<div>
					<MentoringContent data={data.data} />
					<div className="md:hidden block mt-20">
						<MentoringInfoWithApply data={data.data} />
					</div>
					<RecommendMentoring />
				</div>
				<div className="md:block hidden">
					<MentoringInfoWithApply data={data.data} />
				</div>
			</div>
		</Suspense>
	);
};

export default MentoringDetailContainer;
