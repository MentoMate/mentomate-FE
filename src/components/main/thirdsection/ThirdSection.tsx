import { IMentorItemInProps } from "@/interface/mainPageInterface";
import { ReactComponent as Arrow } from "@assets/svg/mainArrow.svg";
import { Link } from "react-router-dom";
import ThirdSectionMentorList from "@components/main/thirdsection/ThirdSectionMentorList";

const ThirdSection = ({ data }: IMentorItemInProps) => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem]">
				<div className="flex justify-between items-center mt-12">
					<h1 className="mx-2 text-xl sm:text-2xl font-bold">
						이런 멘토는 어때요 ?
					</h1>
					<Link to={"/mentor"}>
						<div className="mx-2 text-xl sm:text-2xl font-bold text-main-color hidden lg:block ">
							<div className="flex justify-center items-center ">
								<div className="mr-2 ">전체보기</div>
								<Arrow width={20} height={20} />
							</div>
						</div>
					</Link>
				</div>
				<ThirdSectionMentorList data={data} />
			</div>
		</>
	);
};

export default ThirdSection;
