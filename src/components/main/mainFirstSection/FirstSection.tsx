import { IMentoringCardInProps } from "@/interface/mainPageInterface";
import { ReactComponent as Arrow } from "@assets/svg/mainArrowIcon.svg";
import MentoringCardList from "./MentoringCardList";
import { Link } from "react-router-dom";

const FirstSection = ({ data }: IMentoringCardInProps) => {
	return (
		<>
			<div className="pt-20 mb-20 mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<div className="flex justify-between items-center">
					<h1 className="mx-2 sm:text-2xl text-xl font-bold">
						핫한 멘토링을 확인해봐요
					</h1>
					<div className="hidden lg:block mx-2 text-lg font-semibold text-main-color">
						<Link to="/mentoring" className="flex justify-center items-center">
							<div className="mr-2">전체보기</div>
							<Arrow width={13} height={13} />
						</Link>
					</div>
				</div>
				{data.length === 0 ? (
					<>
						<p className="flex justify-center items-center h-[10rem] text-black-400 text-center">
							후기가 아직 등록되지 않았어요 :(
						</p>
					</>
				) : (
					<MentoringCardList data={data} />
				)}
			</div>
		</>
	);
};

export default FirstSection;
