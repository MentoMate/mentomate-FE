import BannerSection from "./BannerSection";
import FirstSection from "./firstsection/FirstSection";
import SecondSection from "./secondsection/SecondSection";
import ThirdSection from "./thirdsection/ThirdSection";
import FourthSection from "./fourthsection/FourthSection";
import FifthSection from "./fifthsection/FifthSection";
import SixSection from "./sixsection/SixSection";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "react-query";

const Main = () => {
	const { fetchDataUseAxios } = useAxios();

	const { data } = useQuery("mainInfo", async () => {
		const response = await fetchDataUseAxios("useTokenAxios", {
			url: "/mentoring/main/",
			method: "GET",
		});
		console.log(response);
		if (response) return response.data;
	});
	return (
		<>
			<BannerSection />
			<FirstSection data={data.MentoringByCountWatch} />
			<SecondSection />
			<ThirdSection />
			<FourthSection />
			<FifthSection data={data.MentoringByEndDate} />
			<SixSection />
		</>
	);
};

export default Main;
