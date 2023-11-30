import { ICommunityItemInProps } from "@/interface/mainPageInterface";
import { ReactComponent as Arrow } from "@assets/svg/mainArrowIcon.svg";
import { Link } from "react-router-dom";
import CommunityItemList from "./CommunityItemList";

const FourthSection = ({ data }: ICommunityItemInProps) => {
	return (
		<>
			<div className="mx-auto lg:w-[60rem] sm:w-[30rem] w-[15rem] mb-20">
				<div className="flex justify-between items-center">
					<h1 className="mx-2 text-xl sm:text-2xl font-bold">
						후기도 볼 수 있어요
					</h1>
					<Link to={"/community"}>
						<div className="mx-2 text-lg font-semibold text-main-color hidden lg:block ">
							<div className="flex justify-center items-center ">
								<div className="mr-2">전체보기</div>
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
					<CommunityItemList data={data} />
				)}
			</div>
		</>
	);
};

export default FourthSection;
