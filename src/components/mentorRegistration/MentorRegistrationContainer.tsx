import { useEffect } from "react";
import PrevAndNextButton from "./PrevAndNextButton";
import RegistrationStepContainer from "./registrationStep/RegistartionStepContainer";
import { useSetRecoilState } from "recoil";
import { mentorRegistrationForm } from "@/data/mentorRegistrationData";
import { selectedCategoryState } from "@/state/selectedCategory";
import { registrationStep } from "@/state/mentorRegistrationStep";

const MentorRegistrationContainer = () => {
	const setCategory = useSetRecoilState(selectedCategoryState);
	const setStep = useSetRecoilState(registrationStep);
	const setMentorRegistrationForm = useSetRecoilState(mentorRegistrationForm);

	useEffect(() => {
		setStep(1);
		setMentorRegistrationForm({
			name: "",
			careerYear: 0,
			careerMonth: 0,
			introduceContent: "",
		});
		setCategory({
			selectedCategoryType: "all",
			selectedCategory: "all",
			selectedCategoryName: "카테고리 전체",
		});
	}, []);

	return (
		<div>
			<div className="py-20 bg-black-100 min-h-[60rem]">
				<RegistrationStepContainer />
			</div>
			<PrevAndNextButton />
		</div>
	);
};

export default MentorRegistrationContainer;
