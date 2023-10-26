const Comment = () => {
	return (
		<div className="mt-8">
			<div className="flex items-center">
				<div className="md:w-[2.5rem] md:h-[2.5rem] w-[2rem] h-[2rem] border border-black-200 rounded-full">
					<img
						src="/src/assets/svg/user.svg"
						alt=""
						className="w-full h-full rounded-full object-contain"
					/>
				</div>
				<div className="ml-4 font-semibold md:text-base text-[0.9rem]">
					조성주
				</div>
			</div>
			<div className="md:ml-14 ml-12">
				<p className="text-sm">
					코딩은 정말 어려운 것 같아요. 박진짜 멘토님 멘토링이 되게 좋던데
					나중에 멘토링 열리면 한번 들어보세요 ! 코딩은 정말 어려운 것 같아요.
					박진짜 멘토님 멘토링이 되게 좋던데 나중에 멘토링 열리면 한번
					들어보세요 ! 코딩은 정말 어려운 것 같아요. 박진짜 멘토님 멘토링이 되게
					좋던데 나중에 멘토링 열리면 한번 들어보세요 ! 코딩은 정말 어려운 것
					같아요. 박진짜 멘토님 멘토링이 되게 좋던데 나중에 멘토링 열리면 한번
					들어보세요 !
				</p>
				<div className="mt-2 text-[0.75rem] text-black-400">1시간 전</div>
			</div>
		</div>
	);
};

export default Comment;
