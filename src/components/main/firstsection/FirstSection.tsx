import MentoringCardList from "./MentoringCardList";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow.svg";
const FirstSection = () => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[80rem] sm:w-[40rem] mt-40">
				<div className="font-bold ml-5 lg:text-3xl ">
					핫한 멘토링을 확인해봐요
				</div>
				<div className=" font-bold mr-16 text-main-color  text-[#ABDEE6] lg:text-3xl md:text-2xl">
					<div className="flex items-center">
						<div className="mr-2">전체보기</div>
						<Arrow width={20} height={20} />
					</div>
         
				</div>
        <div className="w-[10rem] bg-main-color">dsd</div>
			</div>
			<MentoringCardList />
		</>
	);
};

export default FirstSection;
