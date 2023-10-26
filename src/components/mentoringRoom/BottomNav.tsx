const BottomNav = () => {
	return (
		<div className="bg-main-color fixed bottom-0 left-0 right-0 z-10 lg:hidden block flex justify-between items-center p-4">
			<button className="flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
				<span className="text-white text-xs">뒤로가기</span>
			</button>

			<button className="flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				<span className="text-white text-xs">추가하기</span>
			</button>
			<button className="flex flex-col items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9 5l7 7-7 7"
					/>
				</svg>
				<span className="text-white text-xs">멘토링 정보</span>
			</button>
		</div>
	);
};
export default BottomNav;
