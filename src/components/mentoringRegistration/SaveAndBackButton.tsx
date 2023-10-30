const SaveAndBackButton = () => {
	return (
		<div className="sticky bottom-0 mx-auto w-full bg-white">
			<div className="flex justify-center py-4 border-t border-black-200">
				<button className="mx-4 px-6 py-4 bg-main-color rounded-md text-white font-bold">
					저장하기
				</button>
				<button className="mx-4 px-6 py-4 bg-white border border-black-200 rounded-md">
					돌아가기
				</button>
			</div>
		</div>
	);
};

export default SaveAndBackButton;
