import BannerSection from "./BannerSection";
import FirstSection from "@/components/main/mainFirstSection/FirstSection";
import SecondSection from "@/components/main/mainSecondSection/SecondSection";
import ThirdSection from "@/components/main/mainThirdSection/ThirdSection";
import FourthSection from "@/components/main/mainFourthSection/FourthSection";
import FifthSection from "@/components/main/mainFifthSection/FifthSection";
import SixSection from "@/components/main/mainSixSection/SixSection";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";

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
		<>
			<BannerSection />
			<FirstSection data={data.MentoringByCountWatch} />
			<SecondSection />
			<ThirdSection data={data.MentorByRating} />
			<FourthSection data={data.PostRegisterDateTime} />
			<FifthSection data={data.MentoringByEndDate} />
			<SixSection data={data.Count} />
		</>
	);
};

export default Main;
