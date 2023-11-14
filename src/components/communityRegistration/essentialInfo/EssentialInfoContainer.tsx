import ChoiceCommunityType from "./ChoiceCommunityType";
import { ReactComponent as CheckList } from "@assets/svg/checklist.svg";
import ThumbNail from "./ThumbNail";

const EssentialInfoContainer = () => {
	return (
		<>
			<div className="mt-8 sm:px-8 px-6 py-10 border border-black-200 rounded-md">
				<div className="flex items-center font-semibold text-lg">
					<CheckList width={40} height={40} />
					필수 정보 입력란
				</div>
				<div className="flex flex-col mt-8 w-full mx-auto">
					<ThumbNail />
					<ChoiceCommunityType />
				</div>
			</div>
		</>
	);
};

export default EssentialInfoContainer;
