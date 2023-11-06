import { ReactComponent as User } from "@assets/svg/user.svg";
import { ReactComponent as FillHeart } from "@assets/svg/fillHeart.svg";
import { ReactComponent as Comment } from "@assets/svg/comment.svg";
const ComunituItem = () => {
	return (
		<div className="my-4 px-6 py-6 md:w-[16rem] sm:w-[13rem] w-[14rem] border border-black-200 rounded-md duration-100 hover:scale-110">
			<div className="text-black-300 text-sm">소통해요</div>
			<p className="mb-4 text-lg font-bold community-overflow">
				코딩 멘토링 추천
			</p>
			<p className="mb-6 text-sm text-black-400 title-overflow">
				이번에 코딩에 관심이 생겼는데 추천해주실 멘토링 없을까요? 이번에 코딩에
				관심이 생겼는데 추천해주실 멘토링 없을까요?이번에 코딩에 관심이 생겼는데
				추천해주실 멘토링 없을까요?
			</p>
			<div className="flex text-sm text-black-400 font-semibold">
				<div className="flex justify-center items-center">
					<User width={18} height={18} className="mr-1" />
					홍길동
				</div>
				<div className="flex justify-center items-center">
					<FillHeart width={20} height={20} className="mx-1" />0
				</div>
				<div className="flex justify-center items-center">
					<Comment width={18} height={18} className="mx-2" />0
				</div>
			</div>
		</div>
	);
};

export default ComunituItem;
