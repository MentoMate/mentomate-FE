import ComunityItemList from "./ComunityItemList";
import { ReactComponent as Arrow } from "../../../assets/svg/arrow.svg";
const FourthSection = () => {
	return (
		<>
			<div className="flex justify-between items-center mx-auto lg:w-[80rem] sm:w-[40rem] mt-40">
				<div className="font-bold ml-5 lg:text-3xl md:text-base">
					커뮤니티에서 후기도 볼수 있어요
				</div>
				<div className=" font-bold mr-16 text-[#ABDEE6] lg:text-3xl ">
        <div className="flex items-center">
						<div className="mr-2">전체보기</div>
						<Arrow width={20} height={20} />
					</div>
				</div>
			</div>
			<ComunityItemList />
		</>
	);
};

export default FourthSection;
