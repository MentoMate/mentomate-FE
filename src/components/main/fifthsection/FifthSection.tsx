import DeadlineMentoringList from "./DeadlineMentoringList";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow.svg";
const FifthSection = () => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[80rem] sm:w-[40rem] mt-40">
				<div className="font-bold ml-5 lg:text-3xl md:text-base">
					마감 임박 멘토링
				</div>
				<div className=" font-bold mr-16 text-[#ABDEE6] lg:text-3xl ">
        <div className="flex items-center">
						<div className="mr-2">전체보기</div>
						<Arrow width={20} height={20} />
					</div>
				</div>
			</div>
			<DeadlineMentoringList />
		</>
	);
};

export default FifthSection;
