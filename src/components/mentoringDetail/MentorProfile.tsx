import { IMentoringDetailProps } from "@/interface/mentoringInfo";
import { useEffect, useState } from "react";

const MentorProfile = ({ data }: IMentoringDetailProps) => {
	const [replaceFollowerCount, setReplaceFollowerCount] = useState<string>("");

	const replaceHandler = () => {
		const replaceFollower = data.followers.toLocaleString();

		setReplaceFollowerCount(replaceFollower);
	};

	useEffect(() => {
		replaceHandler();
	}, []);
	console.log("asd");
	return (
		<div className="flex justify-center items-center mt-4 py-3 bg-white border border-black-200 rounded-md">
			<div className="mx-3 w-[6rem] h-[6rem]">
				<img
					src={data.useProfileImg}
					alt="sample"
					className="w-full h-full rounded-full"
				/>
			</div>
			<div className="lg:ml-3 md:ml-2 ml-3">
				<div className="mb-1 text-lg font-semibold">
					{data.name}
					<span className="ml-1 text-[0.8rem] font-normal">멘토</span>
				</div>
				<div className="lg:text-sm md:text-[0.7rem] text-sm">
					팔로워
					<span className="ml-2 font-semibold text-main-color">
						{replaceFollowerCount}명
					</span>
				</div>
			</div>
		</div>
	);
};

export default MentorProfile;
