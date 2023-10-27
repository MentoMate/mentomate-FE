const ThirdStep = () => {
	return (
		<div>
			<div className="mt-2 text-center font-semibold">
				필수 정보를 입력해주세요.
			</div>
			<form className="mt-8">
				<div className="flex flex-col">
					<label className="mb-2 font-semibold">이름</label>
					<input
						type="text"
						className="px-2 py-1 w-[14rem] border rounded-md outline-main-color"
					/>
				</div>
				<div className="flex flex-col mt-4">
					<label className="font-semibold">경력</label>
					<div className="flex">
						<div className="flex items-center">
							<input
								type="number"
								className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color"
							/>
							<div className="ml-1">년</div>
						</div>
						<div className="flex items-center ml-4">
							<input
								type="number"
								className="px-2 py-1 w-[5rem] border border-black-200 rounded-md outline-main-color"
							/>
							<div className="ml-1">개월</div>
						</div>
					</div>
					<div className="flex flex-col mt-4">
						<label className="mb-2 font-semibold">멘토소개</label>
						<textarea className="h-[17rem] border border-black-200 rounded-md resize-none outline-main-color" />
					</div>
				</div>
			</form>
		</div>
	);
};

export default ThirdStep;
