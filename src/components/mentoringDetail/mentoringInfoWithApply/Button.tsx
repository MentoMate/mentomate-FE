const Button = () => {
	return (
		<div className="flex flex-col mt-2">
			<button className="my-1 py-2 w-full bg-main-color rounded-sm text-white text-lg font-bold">
				멘토링 신청
			</button>
			<button className="my-1 py-2 w-full bg-yellow-200 rounded-sm text-white text-lg font-bold">
				1:1 문의
			</button>
		</div>
	);
};

export default Button;
