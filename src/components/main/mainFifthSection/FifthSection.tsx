import { IMentoringCardInProps } from "@/interface/mainPageInterface";
import { ReactComponent as Arrow } from "@assets/svg/mainArrowIcon.svg";
import { Link } from "react-router-dom";
import DeadlineMentoringList from "./DeadlineMentoringList";

const FifthSection = ({ data }: IMentoringCardInProps) => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem] pb-28">
				<div className="flex justify-between items-center">
					<h1 className="mx-2 text-xl sm:text-2xl font-bold">
						마감 임박 멘토링
					</h1>
					<Link to={"/mentoring"}>
						<div className="mx-2 text-lg font-semibold text-main-color hidden lg:block ">
							<div className="flex justify-center items-center">
								<div className="mr-2">전체보기</div>
								<Arrow width={13} height={13} />
							</div>
						</div>
					</Link>
				</div>
				{data.length === 0 ? (
					<>
						<p className="flex justify-center items-center h-[10rem] text-black-400 text-center">
							마감 임박 멘토링이 없습니다.
						</p>
					</>
				) : (
					<DeadlineMentoringList data={data} />
				)}
			</div>
		</>
	);
};

export default FifthSection;
