import { mentorRegistrationForm } from "@/data/mentorRegistrationForm";
import useAxios from "@/hooks/useAxios";
import { registrationStep } from "@/state/mentorRegistrationStep";
import { selectedCategoryState } from "@/state/selectedCategory";
import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import PrevAndNextButton from "./PrevAndNextButton";
import RegistrationStepContainer from "./registrationStep/RegistrationStepContainer";

const MentorRegistrationContainer = () => {
	const setCategory = useSetRecoilState(selectedCategoryState);
	const setStep = useSetRecoilState(registrationStep);
	const setForm = useSetRecoilState(mentorRegistrationForm);
	const { fetchDataUseAxios } = useAxios();
	const reactQuillRef = useRef<any>(null);

	const makeRandomKeyHandler = async () => {
		const characters =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let randomKey = "";

		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomKey += characters.charAt(randomIndex);
		}

		const response = await fetchDataUseAxios("useTokenAxios", {
			method: "GET",
			url: `/upload?key=mentor/${randomKey}`,
		});

		if (response && response.status !== 200) {
			makeRandomKeyHandler();
			return;
		}

		setForm({
			name: "",
			careerYear: 0,
			careerMonth: 0,
			introduceContent: "",
			img: null,
			uploadFolder: `mentor/${randomKey}`,
			uploadImg: [],
		});
	};

	useEffect(() => {
		setStep(1);
		makeRandomKeyHandler();
		setCategory({
			selectedCategoryType: "all",
			selectedCategory: "all",
			selectedCategoryName: "카테고리 전체",
		});
	}, []);

	return (
		<div>
			<div className="py-20 bg-black-100 min-h-[60rem]">
				<RegistrationStepContainer reactQuillRef={reactQuillRef} />
			</div>
			<PrevAndNextButton reactQuillRef={reactQuillRef} />
		</div>
	);
};

export default MentorRegistrationContainer;
