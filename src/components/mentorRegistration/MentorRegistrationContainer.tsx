import PrevAndNextButton from "./PrevAndNextButton";
import RegistrationStepContainer from "./registrationStep/RegistartionStepContainer";

const MentorRegistrationContainer = () => {
	return (
		<div>
			<div className="py-12 bg-black-100 h-[60rem]">
				<RegistrationStepContainer />
			</div>
			<PrevAndNextButton />
		</div>
	);
};

export default MentorRegistrationContainer;
