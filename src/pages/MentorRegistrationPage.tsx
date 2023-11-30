import MentorRegistrationContainer from "@/components/mentorRegistration/MentorRegistrationContainer";
import useCheckAuth from "@/hooks/useCheckAuth";

const MentorRegistrationPage = () => {
	useCheckAuth("/mentorRegistration");

	return (
		<>
			<MentorRegistrationContainer />
		</>
	);
};

export default MentorRegistrationPage;
