import BannerSection from "./BannerSection";
import FirstSection from "./firstSection/FirstSection";
import SecondSection from "./secondSection/SecondSection";
import ThirdSection from "./thirdSection/ThirdSection";
import FourthSection from "./fourthSection/FourthSection";
import FifthSection from "./fifthSection/FifthSection";
import SixSection from "./sixSection/SixSection";
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
