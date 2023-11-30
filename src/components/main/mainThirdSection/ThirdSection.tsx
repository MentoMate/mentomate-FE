import { IMentorItemInProps } from "@/interface/mainPageInterface";
import { ReactComponent as Arrow } from "@assets/svg/mainArrowIcon.svg";
import { Link } from "react-router-dom";
import ThirdSectionMentorList from "@/components/main/mainThirdSection/ThirdSectionMentorList";

const ThirdSection = ({ data }: IMentorItemInProps) => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem] mb-20">
				<div className="flex justify-between items-center">
					<h1 className="mx-2 sm:text-2xl text-xl font-bold">
						이런 멘토는 어때요 ?
					</h1>
					<Link to={"/mentor"}>
						<div className="hidden lg:block mx-2 text-lg font-semibold text-main-color">
							<div className="flex justify-center items-center ">
								<div className="mr-2 ">전체보기</div>
								<Arrow width={13} height={13} />
							</div>
						</div>
					</Link>
				</div>
				{data.length === 0 ? (
					<>
						<p className="flex justify-center items-center h-[10rem] text-black-400 text-center">
							후기가 아직 등록되지 않았어요 :(
						</p>
					</>
				) : (
					<ThirdSectionMentorList data={data} />
				)}
			</div>
		</>
	);
};

export default ThirdSection;
