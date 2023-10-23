import { lazy } from "react";

const ChoiceSignUpType = lazy(
	() => import("../components/choiceSignUpType/ChoiceSignUpType"),
);

const ChoiceSignUpTypePage = () => {
	return (
		<>
			<ChoiceSignUpType />
		</>
	);
};

export default ChoiceSignUpTypePage;
