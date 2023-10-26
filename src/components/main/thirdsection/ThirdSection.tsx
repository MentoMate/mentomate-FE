import MentorCardList from "./MentorCardList";
import { ReactComponent as Arrow } from "@/assets/svg/arrow.svg";
const ThirdSection = () => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[80rem] sm:w-[40rem] mt-40">
				<div className="font-bold mx-auto lg:ml-5 lg:text-3xl ">
        이런 멘토는 어때요 ?
				</div>
				<div className="font-bold mr-16 text-main-color lg:text-3xl md:text-2xl hidden lg:block ">
					<div className="flex items-center">
						<div className="mr-2">전체보기</div>
						<Arrow width={20} height={20} />
					</div>
         
				</div>
      
			</div>
			<MentorCardList />
		</>
	);
};

export default ThirdSection;
