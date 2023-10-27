const CommunityWriterInfo = () => {
	return (
		<div className="flex mt-16 border-b border-black-200 py-2 mb-12">
			<div className="w-[4rem] h-[4rem] border border-black-200 rounded-full">
				<img
					src="/src/assets/svg/user.svg"
					alt=""
					className="w-full h-full rounded-full object-contain"
				/>
			</div>
			<div className="flex flex-col justify-center ml-4">
				<div className="md:text-base text-sm font-bold">홍길동</div>
				<div className="flex md:flex-row flex-col md:mt-0 mt-1 text-black-400">
					<div className="md:text-base text-sm">작성일 : 2023.10.19</div>
					<div className="md:ml-3 md:text-base text-sm">조회 8</div>
				</div>
			</div>
		</div>
	);
};

export default CommunityWriterInfo;
