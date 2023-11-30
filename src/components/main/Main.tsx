import FifthSection from "@/components/main/mainFifthSection/FifthSection";
import FirstSection from "@/components/main/mainFirstSection/FirstSection";
import FourthSection from "@/components/main/mainFourthSection/FourthSection";
import ThirdSection from "@/components/main/mainThirdSection/ThirdSection";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";
import BannerSection from "./BannerSection";

const Main = () => {
	const { fetchDataUseAxios } = useAxios();

	const { data } = useQuery("mainInfo", async () => {
		const response = await fetchDataUseAxios("defaultAxios", {
			url: "/mentoring/main",
			method: "GET",
		});

		if (response) {
			if (response.status === 200) {
				return response.data;
			}
		}
	});

	return (
		<div className="bg-black-100 min-h-min-height">
			<BannerSection />
			<FirstSection data={data.MentoringByCountWatch} />
			<ThirdSection data={data.MentorByRating} />
			<FourthSection data={data.PostRegisterDateTime} />
			<FifthSection data={data.MentoringByEndDate} />
		</div>
	);
};

export default Main;
