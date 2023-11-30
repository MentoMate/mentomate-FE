import { registrationStep } from "@/state/mentorRegistrationStep";
import { ReactComponent as RegisterMentor } from "@assets/svg/registerMentor.svg";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

interface IProps {
	readonly reactQuillRef: any;
}

const RegistrationStepContainer = ({ reactQuillRef }: IProps) => {
	const step = useRecoilValue(registrationStep);
	const [progressState, setProgressState] = useState<number>(0);

	useEffect(() => {
		let percent = 0;
		if (step === 1) {
			percent = 0;
		} else if (step === 2) {
			percent = 50;
		} else if (step === 3) {
			percent = 100;
		}
		setProgressState(percent);
	}, [step]);

	return (
		<div className="mx-auto lg:w-[48rem] sm:w-[33rem] w-[20rem] min-h-[45rem] bg-white shadow-md">
			<div className="sm:mx-12 mx-4 py-8">
				<div className="flex items-center">
					<RegisterMentor width={40} height={40} />
					<div className="ml-2 text-lg font-bold">멘토 등록</div>
				</div>
				<div className="flex items-center mt-8 ">
					<progress
						value={progressState}
						max={100}
						className="sm:w-full w-full h-2 bg-black-200"
					/>
					<div className="flex ml-4 font-semibold">
						<div>
							{step === 1 && "0"}
							{step === 2 && "50"}
							{step === 3 && "100"}
						</div>
						<div className="ml-1">%</div>
					</div>
				</div>
				{step === 1 && <FirstStep />}
				{step === 2 && <SecondStep />}
				{step === 3 && <ThirdStep reactQuillRef={reactQuillRef} />}
			</div>
		</div>
	);
};

export default RegistrationStepContainer;
