import BannerSection from "./BannerSection";
import FirstSection from "@components/main/firstsection/FirstSection";
import SecondSection from "@components/main/secondsection/SecondSection";
import ThirdSection from "@components/main/thirdsection/ThirdSection";
import FourthSection from "@components/main/fourthsection/FourthSection";
import FifthSection from "@components/main/fifthsection/FifthSection";
import SixSection from "@components/main/sixsection/SixSection";
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
