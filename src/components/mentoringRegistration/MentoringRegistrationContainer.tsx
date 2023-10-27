import EssentialInfoContainer from "./essentialInfo/EssentialInfoContainer";
import MentoringTitle from "./MentoringTitle";
import SaveAndBackButton from "./SaveAndBackButton";

const MentoringRegistrationContainer = () => {
	return (
		<div className="h-screen bg-black-100">
			<div className="mx-auto lg:w-[60rem] md:w-[40rem] sm:w-[35rem] w-[20rem] h-full bg-white">
				<div className="sm:mx-16 mx-4 pt-16">
					<h1 className="font-bold md:text-xl text-lg">멘토링 등록</h1>
					<EssentialInfoContainer />
					<MentoringTitle />
				</div>
			</div>
			<SaveAndBackButton />
		</div>
	);
};

export default MentoringRegistrationContainer;
