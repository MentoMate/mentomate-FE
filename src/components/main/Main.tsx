import BannerSection from "./BannerSection";
import FirstSection from "./firstsection/FirstSection";
import SecondSection from "./secondsection/SecondSection";
import ThirdSection from "./thirdsection/ThirdSection";
import FourthSection from "./fourthsection/FourthSection";
import FifthSection from "./fifthsection/FifthSection";
import SixSection from "./sixsection/SixSection";
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
const Main = () => {
	return (
		<>
			<Header />
			<BannerSection />
			<FirstSection />
			<SecondSection />
			<ThirdSection />
			<FourthSection />
			<FifthSection />
			<SixSection />
			<Footer />
		</>
	);
};

export default Main;
