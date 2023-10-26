import DeadlineMentoringList from "./DeadlineMentoringList";
import { ReactComponent as Arrow } from "@/assets/svg/arrow.svg";
const FifthSection = () => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<div className="flex justify-between items-center mt-12">
					<h1 className="mx-2 text-xl sm:text-2xl font-bold">
						마감 임박 멘토링
					</h1>
					<div className="mx-2 text-xl sm:text-2xl font-bold text-main-color hidden lg:block ">
						<div className="flex justify-center items-center ">
							<div className="mr-2 ">전체보기</div>
							<Arrow width={20} height={20} />
						</div>
					</div>
				</div>
				<DeadlineMentoringList />
			</div>
		</>
	);
};

export default FifthSection;
