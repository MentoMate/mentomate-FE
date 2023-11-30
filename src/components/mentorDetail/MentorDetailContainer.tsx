import useAxios from "@/hooks/useAxios";
import { alertHandler } from "@/utils/alert";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import MentorInfo from "./MentorInfo";
import MentorIntroduce from "./MentorIntroduce";
import MentorReviewContainer from "./mentorReview/MentorReviewContainer";
import PastMentoringContainer from "./pastMentoring/PastMentoringContainer";
import { useEffect } from "react";

const MentorDetailContainer = () => {
	const { mentorId } = useParams();
	const { fetchDataUseAxios } = useAxios();
	const navigate = useNavigate();

	const getMentorInfoHandler = async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/user/profile/${mentorId}`,
		});

		if (response) {
			const status = response.status;

			if (status === 200) {
				return response.data;
			}

			if (status === 400) {
				alertHandler("error", "존재하지 않는 멘토입니다.");
			}

			if (status === 500) {
				alertHandler(
					"error",
					"서버에 오류가 발생하였습니다. 잠시 후에 다시 시도해주세요.",
				);
			}

			return "";
		}
	};

	const { data } = useQuery(["mentorInfo", mentorId], getMentorInfoHandler);

	useEffect(() => {
		if (data === "") {
			navigate("/mentor");
		}
	}, [data]);

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
