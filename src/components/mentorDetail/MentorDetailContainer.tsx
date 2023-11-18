import { useQuery } from "react-query";
import MentorInfo from "./MentorInfo";
import MentorIntroduce from "./MentorIntroduce";
import PastMentoringContainer from "./pastMentoring/PastMentoringContainer";
import useAxios from "@/hooks/useAxios";
import { useParams } from "react-router-dom";
import MentorReviewContainer from "./mentorReview/MentorReviewContainer";

const MentorDetailContainer = () => {
	const { mentorId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const getMentorInfoHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/user/profile/${mentorId}`,
		});

		if (response && response.status === 200) {
			return response.data;
		}
	};

	const { data } = useQuery(["mentorInfo"], getMentorInfoHandler);

	return (
		<div className="relative flex md:flex-row flex-col mt-16 mx-auto lg:w-[60rem] md:w-[40rem] w-[20rem]">
			<div>
				<div className="md:hidden block md:mb-0 mb-12">
					<MentorInfo mentorItem={data} />
				</div>
				<MentorIntroduce mentorItem={data} />
				<MentorReviewContainer />
				<PastMentoringContainer userId={data.userId} />
			</div>
			<div className="md:block hidden">
				<MentorInfo mentorItem={data} />
			</div>
		</div>
	);
};

export default MentorDetailContainer;
